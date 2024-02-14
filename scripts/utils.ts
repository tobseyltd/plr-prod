import detect from 'detect-port';
import { execSync } from 'child_process';
import pg from 'pg';
import { ENV } from '$lib/server/env';
import type { z } from 'zod';
import registerUserSchema from '../src/routes/registrieren/ZodSchema';
import { supabaseAdmin } from '$lib/server/supabase-admin';
import { faker } from '@faker-js/faker';
import { upsertProductRecord } from '$lib/server/products';
import { stripe } from '$lib/server/stripe';

export async function startSupabase() {
	const port = await detect(54322);

	if (port !== 54322) {
		return;
	}
	execSync('npx supabase start');
}

export async function clearSupabaseData() {
	const client = new pg.Client({
		connectionString: ENV.SUPABASE_DB_URL
	});
	await client.connect();
	await client.query('TRUNCATE auth.users CASCADE');
	await client.query('TRUNCATE public.billing_customers CASCADE');
	await client.query('TRUNCATE public.billing_products CASCADE');
	await client.query('TRUNCATE public.billing_subscriptions CASCADE');
}

type CreateUser = Omit<z.infer<typeof registerUserSchema>, 'passwordConfirm'>;

export async function createUser(user: CreateUser) {
	const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
		email: user.email,
		password: user.password,
		options: {
			data: {
				full_name: user.full_name ?? 'Test User'
			}
		}
	});

	if (authError || !authData.user) {
		throw new Error('Error creating user');
	}
	return authData.user;
}

export async function createLesson() {
	const lesson = {
		ep: faker.location.zipCode(),
		title: faker.music.songName(),
		description: faker.word.words({ count: 50 }),
		files: faker.helpers.arrayElements([faker.word.noun(), faker.word.noun()]),
		likes: faker.number.int({ min: 2, max: 200 }),
		topic: faker.word.noun(),
		img: faker.image.urlLoremFlickr(),
		skill: faker.word.adjective(),
		video1: faker.image.urlLoremFlickr(),
		video2: faker.image.urlLoremFlickr(),
		video3: faker.image.urlLoremFlickr(),
		comments: faker.helpers.arrayElements([
			faker.string.sample({ min: 10, max: 40 }),
			faker.string.sample({ min: 10, max: 40 }),
			faker.string.sample({ min: 10, max: 40 })
		])
	};

	const { error, data } = await supabaseAdmin.from('lessons').insert(lesson);

	if (error) {
		throw error;
	}

	return data;
}

export async function syncStripeProducts() {
	const products = await stripe.products.list();
	for (const product of products.data) {
		await upsertProductRecord(product);
	}
}
