const jwt = require("jsonwebtoken");
const { KEY } = require("../config/jwt");
const db = require("../models");
import { Request, Response, NextFunction } from "express";

const authorizationMiddleware = (role?: "admin" | "player") => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authorization = req.headers.authorization;
		if (authorization) {
			try {
				const decoded = jwt.verify(authorization.replace("Bearer ", ""), KEY);
				const userId = decoded.id;
				let user = null;
				if (userId) {
					user = await db.User.findOne({
						where: {
							id: userId,
						},
						include: { model: db.Role, as: "role" },
					});
				}
				if (role) {
					if (user.role.name !== role) {
						res.status(401).end();
					}
				}

				if (user) {
					//@ts-ignore
					req.user = user.dataValues;
					next();
				} else {
					res.status(401).end();
				}
			} catch (e) {
				console.error("error while authorising", e);
				res.status(401).end();
			}
		} else {
			res.status(401).end();
		}
	};
};

module.exports = authorizationMiddleware;
