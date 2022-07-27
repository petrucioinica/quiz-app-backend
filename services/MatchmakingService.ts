import PlayerQueue from "../queue/Queue";
import { UserToQueueInterface } from "../queue/types";
const { Sequelize } = require("sequelize");
const db = require("../models");

const playerQueue = new PlayerQueue();
const unrankedQueue = new PlayerQueue();

module.exports.matchmakeUser = async (user: UserToQueueInterface) => {
	const toMatchmake = playerQueue.matchmake(user);
	//create match and pick random questions for it
	//send the match with the questions
	//then we move to match controller where we handle the match
	//users do not wait for each other, but at the end of the match the earliest ueer will long poll until the match is done
	//when it is done, calculate elo and whatever and send the results to the frontend show they can show them
	return toMatchmake;
};

module.exports.matchmakeUnranked = async (user: UserToQueueInterface) => {
	const toMatchmake = unrankedQueue.matchmake(user);
	if (toMatchmake.p1) {
		//to create match first and pass its id
		const newMatch = await db.Match.create({
			isRanked: false,
			playerOneId: toMatchmake.p1.id,
			playerTwoid: toMatchmake.p2.id,
			playerOneElo: toMatchmake.p1.elo,
			playerTwoElo: toMatchmake.p2.elo,
			startedAt: new Date().toISOString(),
		});
		const matchId = newMatch.id;

		const pickedQuestions = await db.Question.findAll({
			order: Sequelize.literal("rand()"),
			limit: 10,
			include: { model: db.Category, as: "category" },
		});

		await db.MatchQuestion.bulkCreate(
			pickedQuestions.map((q: any, index: number) => ({
				questionId: q.id,
				matchId,
				orderNumber: index + 1,
			}))
		);

		return {
			p1: toMatchmake.p1,
			p2: toMatchmake.p2,
			matchId,
			questions: pickedQuestions,
		};
	}

	//create match and pick random questions for it
	//send the match with the questions
	//then we move to match controller where we handle the match
	//users do not wait for each other, but at the end of the match the earliest ueer will long poll until the match is done
	return toMatchmake;
};

module.exports.confirmMatch = async (
	user: UserToQueueInterface,
	matchId: string
) => {};
