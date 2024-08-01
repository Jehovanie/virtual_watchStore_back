import { Request, Response } from "express";

export const getPong = (req: Request, res: Response): void => {
	res.send("[ ✔] ...pong");
};
