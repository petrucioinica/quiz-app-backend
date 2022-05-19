import { validateEmail, validatePassword } from "../utils/utilFunctions";
import { RegisterUserInput } from "./UsersService.type";
const crypto = require("crypto");

const db = require("../models");

module.exports.registerUser = async (body: RegisterUserInput) => {
	if (!validateEmail(body.email)) {
		throw {
			status: 400,
			error: "Error! Email is invalid",
			message: "Please make sure the E-mail you inserted is a valid one.",
		};
	}

	if (!validatePassword(body.password)) {
		throw {
			status: 400,
			error: "Error! Password is invalid",
			message:
				"Please make sure the password has 8 characters, an uppercase letter, a lowercase letter, a number and a special character.",
		};
	}

	const password = crypto
		.createHash("sha256")
		.update(body.password)
		.digest("hex");
	const addedUser = await db.User.create({
		...body,
		roleId: 1,
		divisionId: 3,
		password,
	});
	return addedUser;
};
