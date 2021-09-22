import express, { Application, Request, Response } from "express";
const dotenv = require("dotenv");

const app: Application = express();
dotenv.config();
const port = process.env.PORT;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
