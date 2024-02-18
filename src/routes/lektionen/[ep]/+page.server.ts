import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { AuthApiError } from '@supabase/supabase-js';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '../../account/ZodSchema';
import { getSubscriptionTier } from '$lib/server/subscriptions';
import { getPaymentStatus } from '$lib/server/onetime';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	async function getLesson(ep: string) {
		const { error: contactError, data: contact } = await event.locals.supabase
			.from('lessons')
			.select('*')
			.eq('ep', ep)
			.limit(1)
			.maybeSingle();

		if (contactError) {
			throw error(500, 'Error fetching contact. Please try again later.');
		}
		if (!contact) {
			throw error(404, 'Contact not found.');
		}
		return contact;
	}
	return {
		lesson: await getLesson(event.params.ep),
		loginForm: await superValidate(zod(loginSchema)),
		tier: session && (await getSubscriptionTier(session.user.id)),
		paymentStatus: session && (await getPaymentStatus(session.user.id))
	};
};

export const actions: Actions = {
	default: async (event) => {
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

		throw redirect(302, '/lektionen/ep-' + event.params.ep);
	}
};
