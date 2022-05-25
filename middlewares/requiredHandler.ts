import { Request, Response, NextFunction } from "express";
//middleware that handles required
//it recieves an array of required fields. If the body does not have those fields it returns a 400 with the appropriate message
module.exports = (fields: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const body = req.body;
		let missing = false;
		for (const field of fields) {
			if (body[field] === undefined || body[field] === "") {
				res
					.status(400)
					.json({
						error: "Error! Field is required!",
						message: `Error! ${field} is required!`,
					})
					.end();
				missing = true;
				break;
			}
		}
		if (!missing) {
			next();
		}
	};
};
