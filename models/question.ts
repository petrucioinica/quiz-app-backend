import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class Question extends Model {}

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
				type: DataTypes.NUMBER,
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return Question;
};
