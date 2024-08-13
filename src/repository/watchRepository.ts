import CustomError from "../entity/CustomeError";
import prisma from "./../utils/PrismaClient";

export const getAllWatches = async () => {
	try {
		const all_watch = await prisma.watch.findMany();
		return all_watch;
	} catch (error: any) {
		throw new CustomError(error.message, error?.code);
	}
};

export const getOneWatchByID = async (wachtID: number) => {
	try {
		const watch = await prisma.watch.findUniqueOrThrow({ where: { id: wachtID } });
		return watch;
	} catch (error: any) {
		if (error?.code === "P2025") {
			throw new CustomError(error.message, 404);
		}
		throw new CustomError(error.message, error?.code);
	}
};
