import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { emailSchema, passwordSchema, profileSchema, loginSchema } from './ZodSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { AuthApiError } from '@supabase/supabase-js';
import { error, fail, redirect } from '@sveltejs/kit';
import { getUserProfile, handleLoginRedirect } from '$lib/helpers';
import { getSubscriptionTier } from '$lib/server/subscriptions';
import { getPaymentStatus } from '$lib/server/onetime';
import { supabaseAdmin } from '$lib/server/supabase-admin';
import { stripe } from '$lib/server/stripe';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	if (!session) redirect(302, '/login');

	return {
		loginForm: await superValidate(zod(loginSchema)),
		profileForm: session && (await superValidate(await getUserProfile(event), zod(profileSchema))),
		emailForm: await superValidate(session && { email: session.user.email }, zod(emailSchema)),
		passwordForm: await superValidate(zod(passwordSchema)),
		tier: session && (await getSubscriptionTier(session.user.id)),
		paymentStatus: session && (await getPaymentStatus(session.user.id))
	};
};

export const actions: Actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error: authError } = await event.locals.supabase.auth.signInWithPassword(form.data);

		if (authError) {
			if (authError instanceof AuthApiError && authError.status === 400) {
				setError(form, 'email', 'Invalid credentials');
				setError(form, 'password', 'Invalid credentials');
				return fail(400, {
					form
				});
			}
		}

		throw redirect(302, handleLoginRedirect(event));
	},

	updateProfile: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const profileForm = await superValidate(event, zod(profileSchema));

		if (!profileForm.valid) {
			return fail(400, {
				profileForm
			});
		}

		const { error: profileError } = await event.locals.supabase
			.from('profiles')
			.update(profileForm.data)
			.eq('id', session.user.id);

		if (profileError) {
			return setError(profileForm, 'Error updating your profile.');
		}

		return {
			profileForm
		};
	},
	updateEmail: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const emailForm = await superValidate(event, zod(emailSchema));
		if (!emailForm.valid) {
			return fail(400, {
				emailForm
			});
		}

		const { error: emailError } = await event.locals.supabase.auth.updateUser({
			email: emailForm.data.email
		});

		if (emailError) {
			return setError(emailForm, 'email', 'Error updating your email.');
		}

		return {
			emailForm
		};
	},
	updatePassword: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const passwordForm = await superValidate(event, zod(passwordSchema), {
			id: 'password'
		});

		if (!passwordForm.valid) {
			return fail(400, {
				passwordForm
			});
		}

		if (passwordForm.data.password !== passwordForm.data.passwordConfirm) {
			return setError(passwordForm, 'passwordConfirm', 'Passwords must match');
		}

		const { error: passwordError } = await event.locals.supabase.auth.updateUser({
			password: passwordForm.data.password
		});

		if (passwordError) {
			return setError(passwordForm, 'Error updating your password');
		}
		return {
			passwordForm
		};
	},
	deleteProfile: async (event) => {
		const session = await event.locals.getSession();
		if (!session) {
			throw error(401, 'Unauthorized');
		}

		const sessionId = session.user.id;

		try {
			const { data: billingCustomer, error: customerError } = await event.locals.supabase
				.from('billing_subscriptions')
				.select('id')
				.eq('user_id', sessionId)
				.limit(1)
				.maybeSingle();

			if (customerError) {
				throw customerError.message;
			}

			if (billingCustomer) {
				await stripe.customers.del(billingCustomer.id);
			}
		} catch (ERROR) {
			console.log(ERROR);
		}

		const { error: singoutError } = await event.locals.supabase.auth.signOut();

		if (singoutError) {
			throw singoutError.message;
		}

		const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(sessionId);

		if (deleteError) {
			throw deleteError.message;
		}
		redirect(302, '/account');
	}
};
