import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class EmailToken extends Model {}
	EmailToken.init(
		{
			id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
		},
		{ sequelize }
	);
	return EmailToken;
};
