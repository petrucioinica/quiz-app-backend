import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class Role extends Model {
		//@ts-ignore
		static associate(models) {
			Role.hasMany(models.User, {
				foreignKey: "roleId",
			});
		}
	}

	Role.init(
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
		},
		{ sequelize }
	);
	return Role;
};
