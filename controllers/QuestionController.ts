import { Router } from "express";
import { ErrorInterface } from "../services/types";
const requiredHandler = require("../middlewares/requiredHandler");
const express = require("express");
const router: Router = express.Router();
const authorisationMiddleware = require("../middlewares/authroisation");
const {
	createQuestion,
	getQuestions,
	deleteQuestion,
	updateQuestion,
} = require("../services/QuestionService");

router.use(authorisationMiddleware("admin"));

router.post(
	"/create",
	requiredHandler([
		"question",
		"first",
		"second",
		"third",
		"fourth",
		"availableTime",
		"correctAnswer",
		"categoryId",
	]),
	async (req, res) => {
		const body = req.body;
		try {
			const processedQuestion = await createQuestion(body);
			res.status(200).json(processedQuestion);
		} catch (err) {
			console.error(err);
			res.status((err as ErrorInterface).status ?? 400).json({
				error: (err as ErrorInterface).error ?? "Error!",
				message: (err as ErrorInterface).message ?? "Something went wrong!",
			});
		}
	}
);

router.get("/get-all/:categoryId?", async (req, res) => {
	try {
		const processedQuestion = await getQuestions(req.params.categoryId);
		res.status(200).json(processedQuestion);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 400).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const result = await deleteQuestion(req.params.id);
		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 400).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

router.put(
	"/:id",
	requiredHandler([
		"question",
		"first",
		"second",
		"third",
		"fourth",
		"availableTime",
		"correctAnswer",
		"categoryId",
	]),
	async (req, res) => {
		try {
			const result = await updateQuestion(req.params.id, req.body);
			res.status(200).json(result);
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
