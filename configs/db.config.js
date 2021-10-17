const dotenv = require("dotenv");

try {
	dotenv.config({
		path: "../.env",
	});
} catch (err) {
	console.log(err);
}

module.exports = {
	host: "localhost",
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	dialect: "mysql",
};
