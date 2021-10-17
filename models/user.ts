import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class User extends Model {}

	User.init(
		{
			// Model attributes are defined here
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				// allowNull defaults to true
			},
		},
		{ sequelize }
	);
	return User;
};
