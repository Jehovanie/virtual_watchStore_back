import { Request, Response } from "express";
import * as watchService from "./../service/WatchService";

export const getAllWatch = async (request: Request, response: Response) => {
	try {
		const watches = await watchService.getAllWatches();
		response.json(watches);
	} catch (error) {
		console.log(error);
	}
};
