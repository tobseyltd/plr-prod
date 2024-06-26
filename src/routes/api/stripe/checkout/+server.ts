import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getCustomerRecord } from '$lib/server/customers';
import { stripe } from '$lib/server/stripe';
import { ENV } from '$lib/server/env';
import { handleLoginRedirect } from '$lib/helpers';

export const GET: RequestHandler = async (event) => {
	const session = await event.locals.getSession();
	if (!session) {
		throw redirect(302, handleLoginRedirect(event));
	}

	const price_id = event.url.searchParams.get('id');
	if (!price_id) {
		throw error(400, 'Invalid request');
	}

	let checkoutUrl: string;

	try {
		const customer = await getCustomerRecord(session.user.id);
		const price = await stripe.prices.retrieve(price_id);

		if (!price) {
			throw new Error('Invalid price id');
		}

		const checkoutSession = await stripe.checkout.sessions.create({
			payment_method_types: price.recurring
				? ['card', 'paypal']
				: ['card', 'paypal', 'klarna', 'giropay'],
			mode: price.recurring ? 'subscription' : 'payment',
			customer: customer.id,
			line_items: [
				{
					price: price.id,
					quantity: 1
				}
			],
			automatic_tax: {
				enabled: true
			},
			customer_update: {
				address: 'auto'
			},
			metadata: {
				user_id: session.user.id
			},

			success_url: `${ENV.PUBLIC_BASE_URL}/account`,
			cancel_url: `${ENV.PUBLIC_BASE_URL}`
		});

		if (!checkoutSession.url) {
			throw new Error('Error creating checkout session');
		}
		checkoutUrl = checkoutSession.url;
	} catch (ERROR) {
		console.log(ERROR);
		throw error(500, 'An error occurred while creating the checkout session.');
	}

	throw redirect(302, checkoutUrl);
};
