import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class User extends Model {
		//@ts-ignore
		static associate(models) {
			User.hasMany(models.Match, {
				foreignKey: "p1_id",
			});

			User.hasMany(models.Match, {
				foreignKey: "p2_id",
			});

			User.hasMany(models.Match, {
				foreignKey: "winner_id",
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
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
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
		},
		{ sequelize }
	);
	return User;
};
