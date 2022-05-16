"use strict";
//npx sequelize-cli db:seed:all for seeding
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("divisions", [
			{
				name: "Gold",
				id: 1,
			},
			{
				name: "Silver",
				id: 2,
			},
			{
				name: "Bronze",
				id: 3,
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
