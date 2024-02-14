import {
	clearSupabaseData,
	createLesson,
	createUser,
	startSupabase,
	syncStripeProducts
} from './utils';

const testUsers = [
	{
		full_name: 'Test User 1',
		email: 'test@test.com',
		password: 'password'
	},
	{
		full_name: 'Test User 2',
		email: 'test2@test.com',
		password: 'password'
	},
	{
		full_name: 'Test User 3',
		email: 'test3@test.com',
		password: 'password'
	}
];

async function seed() {
	try {
		await startSupabase();
		await clearSupabaseData();
		await syncStripeProducts();
		/* await createUser({ email: 'test@test.com', full_name: 'Test user', password: 'password' }); */

		for (const testUser of testUsers) {
			await createUser(testUser);
		}

		for (let i = 0; i < 10; i++) {
			await createLesson();
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	process.exit();
}
seed();
