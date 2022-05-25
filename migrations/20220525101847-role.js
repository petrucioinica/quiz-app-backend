"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("roles", {
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal(
					"CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
				),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("roles");
	},
};
