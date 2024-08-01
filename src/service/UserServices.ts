import prisma from "./../utils/PrismaClient";

export const getAllUsers = async () => {
	try {
		const users = await prisma.user.findMany();
		return users;
	} catch (error) {
		console.error(error);
		return [];
	}
};
