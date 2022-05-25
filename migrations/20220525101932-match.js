"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("matches", {
			id: {
				type: DataTypes.UUID,
				allowNull: false, //@ts-ignore
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			isRanked: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			startedAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			endedAt: {
				type: DataTypes.DATE,
				allowNull: false,
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
			playerOneElo: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			playerTwoElo: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			playerOneId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "NO ACTION",
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
			},
			playerTwoId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "NO ACTION",
				references: {
					model: {
						tableName: "users",
					},
					key: "id",
				},
			},
			winnerId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "NO ACTION",
				references: {
					model: {
						tableName: "users",
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
		await queryInterface.dropTable("matches");
	},
};
