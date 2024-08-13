import CustomError from "../entity/CustomeError";
import * as watchRepository from "./../repository/watchRepository";

export const getAllWatches = async () => {
	try {
		const watchs: any = await watchRepository.getAllWatches();
		return { data: { watchs }, code: 200 };
	} catch (error: any) {
		if (error instanceof CustomError) {
			throw error;
		}
		throw new CustomError(error.message, 500);
	}
};

export const getDetailWatches = async (watchId: number) => {
	try {
		const watch: any = await watchRepository.getOneWatchByID(watchId);
		return { data: { watch }, code: 200 };
	} catch (error: any) {
		if (error instanceof CustomError) {
			throw error;
		}
		throw new CustomError(error.message, 500);
	}
};
