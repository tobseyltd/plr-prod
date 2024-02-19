import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { registerUserSchema } from './ZodSchemas';
import { fail, redirect } from '@sveltejs/kit';
import { randomString } from '$lib/helpers';

export const load: PageServerLoad = async () => {
	return {
		registerForm: await superValidate(zod(registerUserSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerUserSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, 'passwordConfirm', 'Passwörter stimmen nicht überein!');
		}

		const { error: authError } = await event.locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					full_name: form.data.full_name ?? `Mitglied #${randomString()}`
				}
			}
		});

		if (authError) {
			return setError(
				form,
				'email',
				authError.message === 'User already registered'
					? 'Diese E-Mail Adresse gibt es bereits'
					: authError.message
			);
		}

		redirect(302, '/account');

		return {
			form
		};
	}
};
