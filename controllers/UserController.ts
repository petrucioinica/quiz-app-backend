import { Router } from "express";
import { nextTick } from "process";
const requiredHandler = require("../middlewares/requiredHandler");
const express = require("express");
const router: Router = express.Router();

// middleware
router.use((req, res, next) => {
	next();
});

router.post(
	"/register",
	requiredHandler(["username", "password", "email"]),
	(req, res) => {
		const body = req.body;
		res.status(200).json(body);
	}
);

module.exports = router;
