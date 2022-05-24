import {
	CreateCategoryInput,
	UpdateCategoryInput,
} from "./CategoryService.type";

const db = require("../models");

module.exports.createCategory = async (body: CreateCategoryInput) => {
	const newCategory = await db.Category.create(body);
	return newCategory;
};

module.exports.getCategories = async () => {
	const categories = await db.Category.findAll();
	return categories;
};

module.exports.deleteCategory = async (id: string) => {
	const categoryToDelete = await db.Category.findByPk(id);
	if (!categoryToDelete) {
		throw {
			status: 400,
			error: "Category not found",
			message: "The category you are trying to delete does not exist.",
		};
	}
	await categoryToDelete.destroy();
	return { success: true };
};

module.exports.updateCategory = async (
	id: string,
	body: UpdateCategoryInput
) => {
	const updatedCategory = await db.Category.findByPk(id);
	if (!updatedCategory) {
		throw {
			status: 400,
			error: "Category not found",
			message: "The category you are trying to delete does not exist.",
		};
	}
	await updatedCategory.update(body);
	return updatedCategory;
};
