import { validateEmail, validatePassword } from "../utils/utilFunctions";
import { LoginInput, RegisterUserInput } from "./UsersService.type";
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const uuid = require("uuid");
const dotenv = require("dotenv");
const { Op } = require("sequelize");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { KEY } = require("../config/jwt");

module.exports.sendConfirmationEmail = async (user: RegisterUserInput) => {
	try {
		dotenv.config({
			path: "../.env",
		});
		const userEmail = user.email;
		const token = uuid.v4().replace(/-/g, "");

		db.EmailToken.create({
			id: token,
		});
		const frontendUrl = process.env.FRONTEND_URL;

		const activationLink =
			frontendUrl + `/activate-account?email=${userEmail}&token=${token}`;
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "donotreplyquizit@gmail.com", // generated ethereal user
				pass: process.env.EMAIL_PASSWORD, // generated ethereal password
			},
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '"QuizIt!" <donotreplyquizit@gmail.com>', // sender address
			to: userEmail, // list of receivers
			subject: "Activate your QuizIt! account ✔", // Subject line
			text: `Hello there! Welcome to QuizIt! Click on the link below in order to activate your account. ${activationLink}`, // plain text body
			html: `<h1>Hello there!</h1> <h4>Welcome to QuizIt! Click on the link below in order to activate your account.</h4> <h4> <a href="${activationLink}">${activationLink}</a></h4>`, // html body
		});

		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	} catch (err) {
		console.error("Error while sending E-mail! ", err);
	}
};

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

	const usersWithSameUsernameOrEmail = await db.User.findAll({
		where: {
			[Op.or]: [{ username: body.username }, { email: body.email }],
		},
	});

	if (usersWithSameUsernameOrEmail.length) {
		const whatIsTaken =
			usersWithSameUsernameOrEmail[0].email === body.email
				? "email"
				: "username";
		throw {
			status: 400,
			error: `Error! The ${whatIsTaken} is taken`,
			message: `The ${whatIsTaken} you have inserted is taken. Please try another one`,
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
	await module.exports.sendConfirmationEmail(body);
	return addedUser;
};

module.exports.confirmEmail = async (email: string, token: string) => {
	const userWithEmail = await db.User.findOne({ where: { email: email } });
	if (!userWithEmail) {
		console.log("Email does not exist");
		throw "ERROR";
	}

	const emailToken = db.EmailToken.findByPk(token);
	if (!emailToken) {
		console.log("Token not found");
		throw "ERROR";
	}

	await db.User.update({ emailConfirmed: true }, { where: { email: email } });

	return {
		token: jwt.sign(
			{
				id: userWithEmail.id,
				username: userWithEmail.username,
				email: userWithEmail.email,
				elo: userWithEmail.elo,
				roleId: userWithEmail.roleId,
			},
			KEY
		),
	};
};

module.exports.logIn = async (credentials: LoginInput) => {
	const hashedPassword = crypto
		.createHash("sha256")
		.update(credentials.password)
		.digest("hex");

	const userToLogIn = await db.User.findOne({
		where: {
			password: hashedPassword,
			[Op.or]: [{ email: credentials.email }, { username: credentials.email }],
		},
	});

	if (!userToLogIn) {
		throw {
			code: 400,
			error: "Invalid user!",
			message:
				"This combination of email/username and password does not exist.",
		};
	}

	return jwt.sign(
		{
			id: userToLogIn.id,
			username: userToLogIn.username,
			email: userToLogIn.email,
			elo: userToLogIn.elo,
			roleId: userToLogIn.roleId,
		},
		KEY
	);
};
