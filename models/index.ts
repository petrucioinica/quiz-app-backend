import { Model } from "sequelize/types";
import { DB } from "./types";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/config.js");
const db: Partial<DB> = {};

let sequelize = new Sequelize(config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
	.filter((file: string) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
		);
	})
	.forEach((file: string) => {
		if (file !== "types.ts") {
			const model = require(path.join(__dirname, file))(sequelize);
			if (!file.includes("associations")) {
				db[model.name] = model as Model;
			}
		}
	});

Object.keys(db).forEach((modelName: string) => {
	//@ts-ignore
	if (db[modelName].associate) {
		//@ts-ignore
		db[modelName].associate(db);
	}
});

module.exports = db;
