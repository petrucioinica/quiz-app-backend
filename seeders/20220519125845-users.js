"use strict";
const crypto = require("crypto");
//npx sequelize-cli db:seed:all for seeding
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("users", [
			{
				username: "admin",
				password: crypto.createHash("sha256").update("Parola.1!").digest("hex"),
				roleId: 0,
				email: "admin@admin.com",
				profilePicture: null,
				id: crypto.randomBytes(5).toString("hex"),
				createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
				updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
				divisionId: null,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
