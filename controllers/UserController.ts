import { Router } from "express";
import { ErrorInterface } from "../services/types";
const requiredHandler = require("../middlewares/requiredHandler");
const express = require("express");
const router: Router = express.Router();
const { registerUser } = require("../services/UsersService");

// middleware
router.use((req, res, next) => {
	next();
});

router.post(
	"/register",
	requiredHandler(["username", "password", "email"]),
	async (req, res) => {
		const body = req.body;
		try {
			const newUser = await registerUser(body);
			res.status(200).json(newUser);
		} catch (err) {
			console.error(err);
			res.status((err as ErrorInterface).status ?? 400).json({
				error: (err as ErrorInterface).error ?? "Error!",
				message: (err as ErrorInterface).message ?? "Something went wrong!",
			});
		}
		res.status(200).json(body);
	}
);

module.exports = router;
