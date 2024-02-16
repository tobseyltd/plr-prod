import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '../account/ZodSchema';
import { handleLoginRedirect } from '$lib/helpers';

export const load: PageServerLoad = async () => {
	return {
		loginForm: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	login: async (event) => {
		const redirectTo = event.url.searchParams.get('redirectedTo');
		const provider = event.url.searchParams.get('provider') as Provider;

		if (provider) {
			const { data: providerData, error: providerError } =
				await event.locals.supabase.auth.signInWithOAuth({
					provider: 'github'
				});

			if (providerError) {
				console.log(providerError.message);
				return fail(400, {
					message: 'Fehler, probiere es später nochmal'
				});
			}

			redirect(303, providerData.url);
		}

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

		if (redirectTo) throw redirect(302, `/${redirectTo.slice(1)}`);

		throw redirect(302, handleLoginRedirect(event));
	}
};
