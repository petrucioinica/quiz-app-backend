import { Router } from "express";
import { Model } from "sequelize/types";
import { ErrorInterface } from "../services/types";
const requiredHandler = require("../middlewares/requiredHandler");
const express = require("express");
const router: Router = express.Router();
const authorisationMiddleware = require("../middlewares/authroisation");
const db = require("../models");

router.use(authorisationMiddleware("admin"));

router.post("/create", async (req, res) => {
	res.status(200).json({});
});

module.exports = router;
