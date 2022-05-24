export interface CreateQuestionInput {
	question: string;
	first: string;
	second: string;
	third: string;
	fourth: string;
	availableTime: string;
	correctAnswer: string;
	image?: string;
}

export interface UpdateQuestionInput extends CreateQuestionInput {
	id: string;
}
