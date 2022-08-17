//the queue will look for players in a certain interval
//for example, at the beggining we will accept +-50 elo
//the number then starts incrementing
//everyrime we try to maatchmake we keep looking for new people in the queue within the interval of elo mentioned above

import { EnqueuedUserInterface, UserToQueueInterface } from "./types";

class PlayerQueue {
	private queue: EnqueuedUserInterface[];
	private bufferQueue: UserToQueueInterface[];

	public constructor() {
		this.queue = [];
		this.bufferQueue = [];
		setInterval(() => {
			const newQueue: EnqueuedUserInterface[] = [];
			for (const enqPlayer of this.queue) {
				if (this.bufferQueue.find((player) => player.id === enqPlayer.id)) {
					newQueue.push({
						...enqPlayer,
						timeInQueue: enqPlayer.timeInQueue + 1,
					});
				}
			}

			const newPlayersFromBuffer = this.bufferQueue
				.filter((player) => !this.queue.find((p) => p.id === player.id))
				.map((player) => ({
					...player,
					timeInQueue: 1,
				})); ///@ts-ignore

			this.queue = [...newQueue, ...newPlayersFromBuffer].sort(
				(p1, p2) => p1.elo - p2.elo
			);
			this.bufferQueue = [];
		}, 5000);
	}

	public push(player: UserToQueueInterface) {
		if (!this.bufferQueue.filter((p) => p.id === player.id).length) {
			this.bufferQueue = [...this.bufferQueue, player];
		}
	}

	public matchmake(player: UserToQueueInterface) {
		if (!this.bufferQueue.find((user) => user.id === player.id)) {
			this.push(player);
		}

		const playerQueuePosition = this.queue.findIndex(
			(user) => user.id === player.id
		);
		if (playerQueuePosition === -1) {
			return {
				status: "searching",
			};
		} else {
			const plr = this.queue[playerQueuePosition];
			let searchLow = 1;
			let searchHigh = 1;
			while (
				playerQueuePosition - searchLow >= 0 ||
				playerQueuePosition + searchHigh < this.queue.length
			) {
				const v1 = this.queue[playerQueuePosition - searchLow];
				if (v1) {
					if (
						this.queue[playerQueuePosition].elo - v1.elo <=
						50 * this.queue[playerQueuePosition].timeInQueue
					) {
						this.queue = this.queue.filter(
							(p) => p.id !== player.id && p.id !== v1.id
						);
						return { p1: plr, p2: v1 };
					}
				}

				const v2 = this.queue[playerQueuePosition + searchHigh];
				if (v2) {
					if (
						v2.elo - this.queue[playerQueuePosition].elo <=
						50 * this.queue[playerQueuePosition].timeInQueue
					) {
						this.queue = this.queue.filter(
							(p) => p.id !== player.id && p.id !== v2.id
						);
						return { p1: plr, p2: v2 };
					}
				}

				if (
					this.queue[playerQueuePosition].elo - v1.elo >
						50 * this.queue[playerQueuePosition].timeInQueue &&
					v2.elo - this.queue[playerQueuePosition].elo >
						50 * this.queue[playerQueuePosition].timeInQueue
				) {
					return {
						status: "searching",
					};
				}
			}
		}

		return {
			status: "searching",
		};
	}
}

export default PlayerQueue;
