import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function main() {
	// Create users
	const users = [];
	for (let i = 0; i < 10; i++) {
		users.push(
			prisma.user.create({
				data: {
					name: faker.name.findName(),
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
					brand: faker.company.companyName(),
					model: faker.random.word(),
					type: faker.random.word(),
					price: faker.datatype.float({ min: 100, max: 10000 }),
					bestSeler: faker.datatype.float({ min: 0, max: 1000 }),
					material: faker.random.word(),
					water_resistance: faker.datatype.boolean(),
					features: faker.lorem.sentence(),
					release_date: faker.date.past(),
					images: [faker.image.imageUrl(), faker.image.imageUrl()],
					description: faker.lorem.paragraph(),
					stock_quantity: faker.datatype.number({ min: 0, max: 100 }),
					owner: {
						connect: {
							id: allUsers[faker.datatype.number({ min: 0, max: allUsers.length - 1 })].id,
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
							id: allUsers[faker.datatype.number({ min: 0, max: allUsers.length - 1 })].id,
						},
					},
					watch: {
						connect: allWatches
							.slice(0, faker.datatype.number({ min: 1, max: allWatches.length }))
							.map((watch) => ({
								id: watch.id,
							})),
					},
					quantity: faker.datatype.number({ min: 1, max: 5 }),
					total_price: faker.datatype.float({ min: 100, max: 5000 }),
					order_date: faker.date.past(),
					status: faker.random.word(),
					shipping_address: faker.address.streetAddress(),
					payment_method: faker.finance.transactionType(),
					shipping_cost: faker.datatype.float({ min: 5, max: 50 }),
					tracking_number: faker.datatype.uuid(),
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
					status: faker.random.word(),
					delivery_date: faker.date.future(),
					tracking_number: faker.datatype.number({ min: 100000, max: 999999 }),
					shipping_address: faker.address.streetAddress(),
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
							id: allWatches[faker.datatype.number({ min: 0, max: allWatches.length - 1 })].id,
						},
					},
					rating: faker.datatype.float({ min: 1, max: 5 }),
					comment: faker.lorem.sentence(),
					review_date: faker.date.past(),
					author: {
						connect: {
							id: allUsers[faker.datatype.number({ min: 0, max: allUsers.length - 1 })].id,
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
