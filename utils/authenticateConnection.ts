import { Sequelize } from "sequelize/types";

export const authenthicateConnection = async (sequelize: Sequelize) => {
	try {
		await sequelize.authenticate();
		console.log(
			"Connection to the database has been established successfully."
		);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
