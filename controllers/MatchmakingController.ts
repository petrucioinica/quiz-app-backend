import { Router } from "express";
import { ErrorInterface } from "../services/types";
const express = require("express");
const router: Router = express.Router();
const authorisationMiddleware = require("../middlewares/authroisation");
const { matchmakeUser } = require("../services/MatchmakingService");

router.use(authorisationMiddleware());

router.get("/matchmake", (req, res) => {
	try {
		//@ts-ignore
		const user = req.user;
		const toMatchmake = matchmakeUser(user);
		res.send(toMatchmake);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 500).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

module.exports = router;
