import { Router } from "express";
import { ErrorInterface } from "../services/types";
const requiredHandler = require("../middlewares/requiredHandler");
const express = require("express");
const router: Router = express.Router();
const {
	registerUser,
	confirmEmail,
	logIn,
} = require("../services/UsersService");

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
	}
);

router.get("/confirm-email/:email/:token", async (req, res) => {
	try {
		await confirmEmail(req.params.email, req.params.token);
		res.status(200).json({ success: true });
	} catch (err) {
		console.error("Error while confirming email: ", err);
		res.status(400).json({
			error: "Error! Could not confirm E-mail",
			message: "Cannot confirm the given E-mail.",
		});
	}
});

router.post(
	"/login",
	requiredHandler(["email", "password"]),
	async (req, res) => {
		const body = req.body;
		try {
			const token = await logIn(body);
			res.status(200).json({ token });
		} catch (err) {
			console.error(err);
			res.status((err as ErrorInterface).status ?? 400).json({
				error: (err as ErrorInterface).error ?? "Error!",
				message: (err as ErrorInterface).message ?? "Something went wrong!",
			});
		}
	}
);

module.exports = router;
