import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class Role extends Model {
		//@ts-ignore
		static associate(models) {
			Role.hasMany(models.User, {
				foreignKey: "roleId",
				as: "role",
			});
		}
	}

	Role.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return Role;
};
