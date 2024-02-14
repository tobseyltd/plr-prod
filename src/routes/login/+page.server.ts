import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '../account/ZodSchema';

export const load: PageServerLoad = async () => {
	return {
		loginForm: await superValidate(zod(loginSchema))
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

		throw redirect(302, '/account');
	}
};
