import prisma from "./../utils/PrismaClient";

export const getAllWatches = async () => {
	try {
		const watchs = await prisma.watch.findMany();
		return watchs;
	} catch (error) {
		console.error(error);
		return [];
	}
};
