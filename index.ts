import express, { Application, Request, Response } from "express";
const dotenv = require("dotenv");
const cors = require("cors");

const app: Application = express();
dotenv.config();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));

//sequelize
const db = require("./models/index");
db.sequelize.sync();

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "Hello World!",
	});
});

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	//@ts-ignore
	console.error(`Error occured: ${error.message}`);
}
