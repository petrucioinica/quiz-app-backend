import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class User extends Model {
		//@ts-ignore
		static associate(models) {
			User.hasMany(models.Match, {
				foreignKey: "playerOneId",
			});

			User.hasMany(models.Match, {
				foreignKey: "playerTwoId",
			});

			User.hasMany(models.Match, {
				foreignKey: "winnerId",
			});

			User.belongsTo(models.Role, {
				foreignKey: "roleId",
				as: "role",
			});
			User.belongsTo(models.Division, {
				foreignKey: "divisionId",
				as: "division",
			});
		}
	}

	User.init(
		{
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
		},
		{ sequelize, paranoid: true }
	);
	return User;
};
