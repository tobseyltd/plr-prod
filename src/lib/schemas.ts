import { z } from 'zod';
import { productNames } from './config';

export const stripeProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	active: z.boolean(),
	description: z.string(),
	metadata: z.record(z.string())
});

export const stripeCustomerSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	metadata: z.record(z.string())
});

export const stripeSubscriptionStatusEnum = z.enum([
	'trialing',
	'active',
	'canceled',
	'incomplete',
	'incomplete_expired',
	'past_due',
	'unpaid',
	'paused'
]);

const stripeSubscriptionItemsSchema = z.object({
	data: z.array(
		z.object({
			price: z.object({
				product: z.string()
			})
		})
	)
});

export const unixTimestampToISOString = z.number().transform((n) => new Date(n * 1000).toISOString());

export const stripeSubscriptionSchema = z
	.object({
		id: z.string(),
		status: stripeSubscriptionStatusEnum,
		customer: z.string(),
		items: stripeSubscriptionItemsSchema,
		cancel_at_period_end: z.boolean(),
		created: unixTimestampToISOString,
		current_period_start: unixTimestampToISOString,
		current_period_end: unixTimestampToISOString,
		trial_start: unixTimestampToISOString.nullable(),
		trial_end: unixTimestampToISOString.nullable(),
		metadata: z.record(z.string())
	})
	.transform((obj) => {
		const { items, customer, ...rest } = obj;
		const [{ price }] = items.data;
		return {
			...rest,
			customer_id: customer,
			product_id: price.product
		};
	});

export const subscriptionTierSchema = z.enum(productNames);
export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;

export const subscriptionProductSchema = z.object({
	product: z.object({
		name: subscriptionTierSchema
	})
});

export const stripeOnetimeStatusEnum = z.enum(['complete', 'open', 'no_payment_required']);
export const stripeOneTimePaymentStatusEnum = z.enum(['paid', 'unpaid']);
export const stripeOneTimePaymentMode = z.enum(['payment', 'setup', 'subscription']);

export const stripeOnetimePaymentSchema = z
	.object({
		id: z.string(),
		status: stripeOnetimeStatusEnum,
		payment_status: stripeOneTimePaymentStatusEnum,
		customer: z.string(),
		created: unixTimestampToISOString,
		metadata: z.record(z.string()),
		payment_intent: z.string(),
		mode: stripeOneTimePaymentMode
	})
	.transform((obj) => {
		const { customer, ...rest } = obj;
		return {
			...rest,
			customer_id: customer,
			/* product_id: 'prod_PXKFZNnN0wIAky' */
		};
	});
