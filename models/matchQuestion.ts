import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class MatchQuestion extends Model {}

	MatchQuestion.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false, //@ts-ignore
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			playerOneScore: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			playerTwoScore: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			orderNumber: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return MatchQuestion;
};
