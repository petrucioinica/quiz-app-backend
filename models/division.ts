import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class Division extends Model {
		//@ts-ignore
		static associate(models) {
			Division.hasMany(models.User, {
				foreignKey: "divisionId",
			});
		}
	}

	Division.init(
		{
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
			icon: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return Division;
};
