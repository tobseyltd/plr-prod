import type Stripe from 'stripe';
import { supabaseAdmin } from './supabase-admin';
import { stripeProductSchema } from '$lib/schemas';

export async function upsertProductRecord(stripeProduct: Stripe.Product) {
	const product = stripeProductSchema.parse(stripeProduct);
	const { error } = await supabaseAdmin.from('billing_products').upsert(product);

	if (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteProductRecord(stripeProduct: Stripe.Product) {
	const { error } = await supabaseAdmin
		.from('billing_products')
		.delete()
		.eq('id', stripeProduct.id);

	if (error) {
		throw error;
	}
}
