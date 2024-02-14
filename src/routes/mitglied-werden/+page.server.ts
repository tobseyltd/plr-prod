import { lookupKeys } from '$lib/config';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { priceListSchema } from './ZodSchemas';
import { stripe } from '$lib/server/stripe';
import { getPaymentStatus } from '$lib/server/onetime';
import { getSubscriptionTier } from '$lib/server/subscriptions';

const intervalSchema = z.enum(['month', 'year']).catch('month');

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	const interval = intervalSchema.parse(event.url.searchParams.get('interval'));

	const recurring = await stripe.prices.list({
		expand: ['data.product'],
		recurring: { interval },
		type: 'recurring',
		lookup_keys: [...lookupKeys]
	});

	const onetime = await stripe.prices.list({
		expand: ['data.product'],
		type: 'one_time',
		lookup_keys: [...lookupKeys]
	});

	const prices = priceListSchema
		.parse(recurring.data)
		.sort((a, b) => a.unit_amount - b.unit_amount);

	const onetimePrice = priceListSchema.parse(onetime.data);
	console.log(prices);
	return {
		prices: [...prices, ...onetimePrice],
		interval,
		tier: session ? await getSubscriptionTier(session.user.id) : null,
		paymentStatus: session ? await getPaymentStatus(session.user.id) : null
	};
};
