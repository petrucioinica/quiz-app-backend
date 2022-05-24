import {
	CreateQuestionInput,
	UpdateQuestionInput,
} from "./QuestionService.type";

const db = require("../models");

module.exports.createQuestion = async (body: CreateQuestionInput) => {
	const newQuestion = await db.Question.create(body);
	return newQuestion;
};

module.exports.getQuestions = async (categoryId?: string) => {
	const questions = await db.Question.findAll({
		include: {
			model: db.Category,
			as: "category",
		},
		where: categoryId ? { categoryId } : {},
	});
	return questions;
};

module.exports.deleteQuestion = async (id: string) => {
	const questionToDelete = await db.Question.findByPk(id);
	if (!questionToDelete) {
		throw {
			status: 400,
			error: "Question not found",
			message: "The question you are trying to delete does not exist.",
		};
	}
	await questionToDelete.destroy();
	return { success: true };
};

module.exports.updateQuestion = async (
	id: string,
	body: UpdateQuestionInput
) => {
	const updatedQuestion = await db.Question.findByPk(id);
	if (!updatedQuestion) {
		throw {
			status: 400,
			error: "Question not found",
			message: "The question you are trying to delete does not exist.",
		};
	}
	await updatedQuestion.update(body);
	return updatedQuestion;
};
