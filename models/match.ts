import { DataTypes, Model, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize) => {
	class Match extends Model {}

	Match.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false, //@ts-ignore
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			isRanked: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			startedAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			endedAt: {
				type: DataTypes.DATE,
				allowNull: false,
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
			playerOneElo: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			playerTwoElo: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return Match;
};
