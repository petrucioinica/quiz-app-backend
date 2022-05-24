import { Router } from "express";
import { ErrorInterface } from "../services/types";
const requiredHandler = require("../middlewares/requiredHandler");
const express = require("express");
const router: Router = express.Router();
const authorisationMiddleware = require("../middlewares/authroisation");
const {
	createCategory,
	getCategories,
	deleteCategory,
	updateCategory,
} = require("../services/CategoriesService");

router.use(authorisationMiddleware("admin"));

router.post("/create", requiredHandler(["name"]), async (req, res) => {
	const body = req.body;
	try {
		const newCat = await createCategory(body);
		res.status(200).json(newCat);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 400).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

router.get("/get-all", async (req, res) => {
	try {
		const newCat = await getCategories();
		res.status(200).json(newCat);
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
		const result = await deleteCategory(req.params.id);
		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 400).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

router.put("/:id", requiredHandler(["name"]), async (req, res) => {
	try {
		const result = await updateCategory(req.params.id, req.body);
		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		res.status((err as ErrorInterface).status ?? 400).json({
			error: (err as ErrorInterface).error ?? "Error!",
			message: (err as ErrorInterface).message ?? "Something went wrong!",
		});
	}
});

module.exports = router;
