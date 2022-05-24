import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class Question extends Model {
		//@ts-ignore
		static associate(models) {
			Question.belongsToMany(models.Match, {
				foreignKey: "questionId",
				through: models.MatchQuestion,
				as: "match",
			});
			Question.belongsTo(models.Category, {
				as: "category",
				foreignKey: "categoryId",
			});
		}
	}

	Question.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false, //@ts-ignore
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			question: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			first: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			second: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			third: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			fourth: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			availableTime: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 15,
			},
			picture: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			correctAnswer: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ sequelize, paranoid: true }
	);
	return Question;
};
