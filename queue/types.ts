export interface UserToQueueInterface {
	id: string;
	username: string;
	email: string;
	elo: number;
	noOfRankedGames: number;
	noOfUnrankedGames: number;
}

export interface EnqueuedUserInterface extends UserToQueueInterface {
	timeInQueue: number;
}
