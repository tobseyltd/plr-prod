import { stripeOnetimePaymentSchema } from '$lib/schemas';
import type Stripe from 'stripe';
import { supabaseAdmin } from './supabase-admin';

export async function insertOnetimeProduct(stripeProduct: Stripe.Checkout.Session) {
	const product = stripeOnetimePaymentSchema.parse(stripeProduct);

	const { data: customer, error: customerError } = await supabaseAdmin
		.from('billing_customers')
		.select('user_id')
		.eq('id', product.customer_id)
		.limit(1)
		.single();

	if (customerError) {
		throw customerError;
	}

	const { error: oneTimeError } = await supabaseAdmin
		.from('billing_onetime')
		.insert([{ ...product, user_id: customer.user_id }]);

	if (oneTimeError) {
		throw oneTimeError;
	}
}

export async function getPaymentStatus(user_id: string) {
	const { error: paymentError, data: status } = await supabaseAdmin
		.from('billing_onetime')
		.select('payment_status')
		.eq('user_id', user_id)
		.in('payment_status', ['paid', 'unpaid'])
		.limit(1)
		.maybeSingle();

	if (paymentError) {
		throw paymentError;
	}
	return status?.payment_status;
}
