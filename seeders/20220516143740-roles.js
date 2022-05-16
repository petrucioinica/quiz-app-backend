"use strict";
//npx sequelize-cli db:seed:all for seeding
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("roles", [
			{
				id: "admin",
				enumVal: 0,
			},
			{
				name: "player",
				id: 1,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("roles", null, {});
	},
};
