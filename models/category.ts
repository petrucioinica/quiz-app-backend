import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class Category extends Model {
		//@ts-ignore
		static associate(models) {
			Category.hasMany(models.Question, {
				foreignKey: "categoryId",
			});
		}
	}

	Category.init(
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
	return Category;
};
