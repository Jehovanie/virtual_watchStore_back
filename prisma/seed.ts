import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
	// Create users
	const users = [];
	for (let i = 0; i < 10; i++) {
		users.push(
			prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				},
			})
		);
	}
	await prisma.$transaction(users);

	// Get all users
	const allUsers = await prisma.user.findMany();

	// Create watches
	const watches = [];
	for (let i = 0; i < 20; i++) {
		watches.push(
			prisma.watch.create({
				data: {
					brand: faker.company.name(),
					model: faker.lorem.words(),
					type: faker.lorem.words(),
					price: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
					bestSeler: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
					material: faker.lorem.words(),
					water_resistance: faker.datatype.boolean(),
					features: faker.lorem.sentence(),
					release_date: faker.date.past(),
					images: [faker.image.avatarGitHub(), faker.image.avatarGitHub()],
					description: faker.lorem.paragraph(),
					stock_quantity: faker.number.int({ max: 20 }),
					owner: {
						connect: {
							id: allUsers[faker.number.int({ min: 0, max: allUsers.length - 1 })].id,
						},
					},
				},
			})
		);
	}
	await prisma.$transaction(watches);

	// Get all watches
	const allWatches = await prisma.watch.findMany();

	// Create watch orders
	const watchOrders = [];
	for (let i = 0; i < 15; i++) {
		watchOrders.push(
			prisma.watchOrder.create({
				data: {
					userOrder: {
						connect: {
							id: allUsers[faker.number.int({ min: 0, max: allUsers.length - 1 })].id,
						},
					},
					watch: {
						connect: allWatches
							.slice(0, faker.number.int({ min: 1, max: allWatches.length }))
							.map((watch) => ({
								id: watch.id,
							})),
					},
					quantity: faker.number.int({ min: 1, max: 5 }),
					total_price: faker.number.float({ min: 100, max: 5000, multipleOf: 0.02 }),
					order_date: faker.date.past(),
					status: faker.lorem.words(),
					shipping_address: faker.location.streetAddress(),
					payment_method: faker.finance.transactionType(),
					shipping_cost: faker.number.float({ min: 5, max: 50, multipleOf: 0.02 }),
					tracking_number: faker.string.uuid(),
				},
			})
		);
	}
	await prisma.$transaction(watchOrders);

	// Get all watch orders
	const allWatchOrders = await prisma.watchOrder.findMany();

	// Create command deliveries
	const commandDeliveries = [];
	for (let i = 0; i < allWatchOrders.length; i++) {
		commandDeliveries.push(
			prisma.commandDelivery.create({
				data: {
					order: {
						connect: {
							id: allWatchOrders[i].id,
						},
					},
					status: faker.lorem.words(),
					delivery_date: faker.date.future(),
					tracking_number: faker.number.int({ min: 100, max: 999 }),
					shipping_address: faker.location.streetAddress(),
				},
			})
		);
	}
	await prisma.$transaction(commandDeliveries);

	// Create watch reviews
	const watchReviews = [];
	for (let i = 0; i < 30; i++) {
		watchReviews.push(
			prisma.watchReview.create({
				data: {
					watch: {
						connect: {
							id: allWatches[faker.number.int({ min: 0, max: allWatches.length - 1 })].id,
						},
					},
					rating: faker.number.float({ min: 1, max: 5 }),
					comment: faker.lorem.sentence(),
					review_date: faker.date.past(),
					author: {
						connect: {
							id: allUsers[faker.number.int({ min: 0, max: allUsers.length - 1 })].id,
						},
					},
				},
			})
		);
	}
	await prisma.$transaction(watchReviews);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
