import { stripeSubscriptionSchema, subscriptionProductSchema } from '$lib/schemas';
import type Stripe from 'stripe';
import { supabaseAdmin } from './supabase-admin';

export async function insertSubscriptionRecord(stripeSubscription: Stripe.Subscription) {
	const subscription = stripeSubscriptionSchema.parse(stripeSubscription);

	const { data: customer, error: customerError } = await supabaseAdmin
		.from('billing_customers')
		.select('user_id')
		.eq('id', subscription.customer_id)
		.limit(1)
		.single();

	if (customerError) {
		throw customerError;
	}

	const { error: subscriptionError } = await supabaseAdmin.from('billing_subscriptions').insert([
		{
			...subscription,
			user_id: customer.user_id
		}
	]);

	if (subscriptionError) {
		throw subscriptionError;
	}
}

export async function updateSubscriptionRecord(stripeSubscription: Stripe.Subscription) {
	const subscription = stripeSubscriptionSchema.parse(stripeSubscription);

	const { error: subscriptionError } = await supabaseAdmin
		.from('billing_subscriptions')
		.update(subscription)
		.eq('id', subscription.id);

	if (subscriptionError) {
		throw subscriptionError;
	}
}

export async function getSubscriptionTier(user_id: string) {
	const { error: subscriptionError, data: subscription } = await supabaseAdmin
		.from('billing_subscriptions')
		.select('product:product_id(name)')
		.eq('user_id', user_id)
		.in('status', ['active', 'canceled'])
		.limit(1)
		.maybeSingle();

	if (subscriptionError || !subscription) {
		return 'Keine';
	}

	try {
		const tier = subscriptionProductSchema.parse(subscription);
		return tier.product.name;
	} catch (ERROR) {
		return 'Keine';
	}
}
