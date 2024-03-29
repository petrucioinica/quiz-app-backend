import e from "express";
import PlayerQueue from "../queue/Queue";
import { UserToQueueInterface } from "../queue/types";
import { FinishMatchInputsInterface } from "./MatchmakingService.type";
const { Sequelize, Op } = require("sequelize");
const db = require("../models");
const EloRating = require("elo-rating");

const rankedQueue = new PlayerQueue();
const unrankedQueue = new PlayerQueue();

module.exports.matchmake = async (
	user: UserToQueueInterface,
	isRanked?: boolean
) => {
	const currentMatch = await db.Match.findOne({
		where: {
			[Op.or]: [
				{
					playerOneId: user.id,
				},
				{
					playerTwoId: user.id,
				},
			],
			endedAt: null,
		},
		include: [
			{ model: db.User, as: "playerOne" },
			{ model: db.User, as: "playerTwo" },
		],
	});

	if (currentMatch) {
		const returnMatch = {};

		const matchQuestions = await db.MatchQuestion.findAll({
			where: {
				matchId: currentMatch.id,
			},
			include: {
				model: db.Question,
				include: { model: db.Category, as: "category" },
			},
		});

		const availableTime =
			matchQuestions.reduce(
				//@ts-ignore
				(acc, q) => q.Question.availableTime + acc,
				0
			) * 1000;
		//@ts-ignore
		const timeDifference = new Date() - new Date(currentMatch.startedAt);

		if (timeDifference - 10000 > availableTime) {
			currentMatch.endedAt = new Date().toISOString();
			await currentMatch.save();
			return { status: "searching" };
		}
		//@ts-ignore
		returnMatch.questions = matchQuestions.map((q) => q.Question);
		//@ts-ignore
		returnMatch.matchId = currentMatch.id;
		//@ts-ignore
		returnMatch.p1 = currentMatch.playerOne;
		//@ts-ignore
		returnMatch.p2 = currentMatch.playerTwo;
		return returnMatch;
	}

	let toMatchmake;
	if (isRanked) {
		toMatchmake = rankedQueue.matchmake(user);
	} else {
		toMatchmake = unrankedQueue.matchmake(user);
	}

	if (toMatchmake.p1) {
		//to create match first and pass its id
		const newMatch = await db.Match.create({
			isRanked: !!isRanked,
			playerOneId: toMatchmake.p1.id,
			playerTwoId: toMatchmake.p2.id,
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
	} else {
		return toMatchmake;
	}

	//create match and pick random questions for it
	//send the match with the questions
	//then we move to match controller where we handle the match
	//users do not wait for each other, but at the end of the match the earliest ueer will long poll until the match is done
};

module.exports.getMatchInfo = async (matchId: string) => {
	const matchInfo = await db.Match.findOne({
		where: {
			id: matchId,
			endedAt: null,
		},
		include: [
			{ model: db.User, as: "playerOne" },
			{ model: db.User, as: "playerTwo" },
		],
	});

	const matchQuestions = await db.MatchQuestion.findAll({
		where: {
			matchId: matchId,
		},
		include: {
			model: db.Question,
			include: { model: db.Category, as: "category" },
		},
	});

	const availableTime =
		matchQuestions.reduce(
			//@ts-ignore
			(acc, q) => q.Question.availableTime + acc,
			0
		) * 1000;
	//@ts-ignore
	const timeDifference = new Date() - new Date(matchInfo?.startedAt);

	if (timeDifference - 10000 > availableTime) {
		matchInfo.endedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

		if (matchInfo.playerOneScore !== matchInfo.playerTwoScore) {
			matchInfo.winnerId =
				matchInfo.playerOneScore > matchInfo.playerTwoScore
					? matchInfo.playerOneId
					: matchInfo.playerTwoId;
		}

		await matchInfo.save();
		throw {
			status: 400,
			error: "Match expired",
			message: "The match you are trying to play has expired.",
		};
	}

	return {
		p1: matchInfo.playerOne,
		p2: matchInfo.playerTwo,
		matchId, //@ts-ignore
		questions: matchQuestions.map((q) => q.Question),
	};
};

module.exports.finishMatch = async (
	user: UserToQueueInterface,
	body: FinishMatchInputsInterface
) => {
	const matchToEnd = await db.Match.findByPk(body.matchId, {
		include: [
			{ model: db.User, as: "playerOne" },
			{ model: db.User, as: "playerTwo" },
		],
	});

	if (!matchToEnd) {
		throw {
			status: 400,
			error: "Match not found",
			message: "The match you are trying to end does not exist.",
		};
	}

	const matchQuestions = await db.MatchQuestion.findAll({
		where: {
			matchId: body.matchId,
		},
		include: {
			model: db.Question,
			include: { model: db.Category, as: "category" },
		},
	});

	const availableTime =
		matchQuestions.reduce(
			//@ts-ignore
			(acc, q) => q.Question.availableTime + acc,
			0
		) * 1000;
	//@ts-ignore
	const timeDifference = new Date() - new Date(matchToEnd.startedAt);

	if (timeDifference - 10000 > availableTime) {
		matchToEnd.endedAt = new Date()
			.toISOString()
			.slice(0, 19)
			.replace("T", " ");

		if (matchToEnd.playerOneScore !== matchToEnd.playerTwoScore) {
			matchToEnd.winnerId =
				matchToEnd.playerOneScore > matchToEnd.playerTwoScore
					? matchToEnd.playerOneId
					: matchToEnd.playerTwoId;
		}

		await matchToEnd.save();
	} else {
		if (
			matchToEnd.playerOneId === user.id &&
			matchToEnd.playerOneScore === -1
		) {
			matchToEnd.playerOneScore = body.points;
		}

		if (
			matchToEnd.playerTwoId === user.id &&
			matchToEnd.playerTwoScore === -1
		) {
			matchToEnd.playerTwoScore = body.points;
		}

		if (matchToEnd.playerOneScore !== -1 && matchToEnd.playerTwoScore !== -1) {
			matchToEnd.endedAt = new Date()
				.toISOString()
				.slice(0, 19)
				.replace("T", " ");

			if (matchToEnd.playerOneScore !== matchToEnd.playerTwoScore) {
				matchToEnd.winnerId =
					matchToEnd.playerOneScore > matchToEnd.playerTwoScore
						? matchToEnd.playerOneId
						: matchToEnd.playerTwoId;
			}
		}

		await matchToEnd.save();

		if (matchToEnd.isRanked && matchToEnd.winnerId) {
			const newElos = EloRating.calculate(
				matchToEnd.playerOneElo,
				matchToEnd.playerTwoElo,
				matchToEnd.winnerId === matchToEnd.playerOneId
			);

			const newPlayerOneElo = newElos.playerRating;
			const newPlayerTwoElo = newElos.opponentRating;
			const playerOne = await db.User.findByPk(matchToEnd.playerOneId);
			const playerTwo = await db.User.findByPk(matchToEnd.playerTwoId);
			playerOne.elo = newPlayerOneElo;
			playerTwo.elo = newPlayerTwoElo;
			await playerOne.save();
			await playerTwo.save();
		}
	}
	return matchToEnd;
};
