"use strict";
//npx sequelize-cli db:seed:all for seeding
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("roles", [
			{
				name: "admin",
				id: 0,
				createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
				updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
			},
			{
				name: "player",
				id: 1,
				createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
				updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("roles", null, {});
	},
};
