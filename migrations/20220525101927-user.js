"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: {
				type: DataTypes.UUID,
				allowNull: false, //@ts-ignore
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			profilePicture: {
				type: DataTypes.STRING,
			},
			elo: {
				type: DataTypes.INTEGER,
				defaultValue: 1000,
				allowNull: false,
			},
			noOfRankedGames: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			noOfUnrankedGames: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
			ladderPosition: {
				type: DataTypes.INTEGER,
				defaultValue: null,
			},
			emailConfirmed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			roleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "NO ACTION",
				references: {
					model: {
						tableName: "roles",
					},
					key: "id",
				},
			},
			divisionId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				onDelete: "NO ACTION",
				references: {
					model: {
						tableName: "divisions",
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
		await queryInterface.dropTable("users");
	},
};
