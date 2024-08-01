import { Request, Response } from "express";

import * as userService from "./../service/UserServices";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const all_users = await userService.getAllUsers();
		res.json(all_users);
	} catch (error) {
		console.error(error);
	}
};

export const createUser = (req: Request, res: Response): void => {
	res.send("Create a new user");
};
