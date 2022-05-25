"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("categories", {
			id: {
				type: DataTypes.UUID,
				allowNull: false, //@ts-ignore
				defaultValue: Sequelize.UUIDV4,
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
		await queryInterface.dropTable("categories");
	},
};
