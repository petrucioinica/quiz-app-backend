import PlayerQueue from "../queue/Queue";
import { UserToQueueInterface } from "../queue/types";

const db = require("../models");

const playerQueue = new PlayerQueue();

module.exports.matchmakeUser = async (user: UserToQueueInterface) => {
	const toMatchmake = playerQueue.matchmake(user);
	//create match and pick random questions for it
	//send the match with the questions
	//then we move to match controller where we handle the match
	//users do not wait for each other, but at the end of the match the earliest ueer will long poll until the match is done
	//when it is done, calculate elo and whatever and send the results to the frontend show they can show them
	return toMatchmake;
};
