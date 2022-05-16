import { Model, ModelStatic, Sequelize } from "sequelize/types";

export interface DB {
	sequelize: Sequelize;
	Sequelize: Sequelize;
	[key: symbol]: Model;
}
