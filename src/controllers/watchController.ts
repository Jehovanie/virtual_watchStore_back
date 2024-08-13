import { NextFunction, Request, Response } from "express";
import * as watchService from "./../service/WatchService";
import CustomError from "../entity/CustomeError";

export const getAllWatch = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const res_all_watch: any = await watchService.getAllWatches();

		res.status(res_all_watch.code).json(res_all_watch.data);
	} catch (error: any) {
		next(error);
	}
};

export const getDetailWatch = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const watchId = parseInt(req.params.watchId);
		const res_watch = await watchService.getDetailWatches(watchId);

		res.status(res_watch.code).json(res_watch.data);
	} catch (error: any) {
		next(error);
	}
};
