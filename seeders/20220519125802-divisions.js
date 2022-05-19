"use strict";
//npx sequelize-cli db:seed:all for seeding
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("divisions", [
			{
				name: "Gold",
				id: 1,
				icon: "",
				createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
				updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
			},
			{
				name: "Silver",
				id: 2,
				icon: "",
				createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
				updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
			},
			{
				name: "Bronze",
				id: 3,
				icon: "",
				createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
				updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("divisions", null, {});
	},
};
