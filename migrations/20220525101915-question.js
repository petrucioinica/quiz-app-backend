"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("questions", {
			id: {
				type: DataTypes.UUID,
				allowNull: false, //@ts-ignore
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			question: {
				type: DataTypes.STRING(800),
				allowNull: false,
			},
			first: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			second: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			third: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			fourth: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			availableTime: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 15,
			},
			picture: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			correctAnswer: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			categoryId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: {
						tableName: "categories",
					},
					key: "id",
				},
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
		await queryInterface.dropTable("questions");
	},
};
