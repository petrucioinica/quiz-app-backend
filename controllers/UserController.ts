import { Router } from "express";

const express = require("express");
const router: Router = express.Router();

// middleware
router.use((req, res, next) => {
	next();
});

router.post("/register", (req, res) => {
	const body = req.body;
	res.status(200).json(body);
});

module.exports = router;
