import e, { Router } from "express";
import PlayerQueue from "../queue/Queue";
const express = require("express");
const router: Router = express.Router();
const authorisationMiddleware = require("../middlewares/authroisation");

const playerQueue = new PlayerQueue();

router.use(authorisationMiddleware());

router.get("/enqueue", (req, res) => {
	//@ts-ignore
	const user = req.user;

	playerQueue.push(user);
	res.send({ success: true });
});

router.get("/matchmake", (req, res) => {
	//@ts-ignore
	const user = req.user;
	const toMatchmake = playerQueue.matchmake(user);

	res.send(toMatchmake);
});

module.exports = router;
