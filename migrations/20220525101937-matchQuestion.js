"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("matchQuestions", {
			id: {
				type: DataTypes.UUID,
				allowNull: false, //@ts-ignore
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			playerOneScore: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			playerTwoScore: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			matchId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "NO ACTION",
				references: {
					model: {
						tableName: "matches",
					},
					key: "id",
				},
			},

			questionId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "NO ACTION",
				references: {
					model: {
						tableName: "questions",
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
		await queryInterface.dropTable("matchQuestions");
	},
};
