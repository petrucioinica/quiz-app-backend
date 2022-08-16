import { Router } from "express";
import { ErrorInterface } from "../services/types";
const express = require("express");
const router: Router = express.Router();
const authorisationMiddleware = require("../middlewares/authroisation");
const {
	matchmakeUser,
	matchmakeUnranked,
	getMatchInfo,
} = require("../services/MatchmakingService");

router.use(authorisationMiddleware());

router.get("/matchmake", async (req, res) => {
	try {
		//@ts-ignore
		const user = req.user;
		const toMatchmake = await matchmakeUser(user);
		res.send(toMatchmake);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 500).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

router.get("/matchmake-unranked", async (req, res) => {
	try {
		//@ts-ignore
		const user = req.user;
		const toMatchmake = await matchmakeUnranked(user);
		res.send(toMatchmake);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 500).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

router.get("/get-match-info/:matchId", async (req, res) => {
	try {
		//@ts-ignore
		const matchInfo = await getMatchInfo(req.params.matchId);
		res.send(matchInfo);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 500).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

module.exports = router;
