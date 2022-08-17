import { Router } from "express";
import { ErrorInterface } from "../services/types";
const express = require("express");
const router: Router = express.Router();
const authorisationMiddleware = require("../middlewares/authroisation");
const {
	matchmakeUser,
	matchmake,
	getMatchInfo,
	finishMatch,
} = require("../services/MatchmakingService");
const requiredHandler = require("../middlewares/requiredHandler");

router.use(authorisationMiddleware());

router.get("/matchmake-ranked", async (req, res) => {
	try {
		//@ts-ignore
		const user = req.user;
		const toMatchmake = await matchmake(user, true);
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
		const toMatchmake = await matchmake(user);
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

router.post(
	"/finish-match",
	requiredHandler(["matchId", "points"]),
	async (req, res) => {
		try {
			//@ts-ignore
			const user = req.user;
			const matchInfo = await finishMatch(user, req.body);
			res.send(matchInfo);
		} catch (err) {
			console.error(err);
			res.status((err as ErrorInterface).status ?? 500).json({
				error: (err as ErrorInterface).error ?? "Error!",
				message: (err as ErrorInterface).message ?? "Something went wrong!",
			});
		}
	}
);

module.exports = router;
