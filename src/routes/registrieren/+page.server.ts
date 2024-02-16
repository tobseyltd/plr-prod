import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { registerUserSchema } from './ZodSchemas';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		registerForm: await superValidate(zod(registerUserSchema))
	};
};

export const actions: Actions = {
	registerWithEmail: async (event) => {
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
					full_name: form.data.full_name ?? ''
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
	},
	signupWithGithub: async (event) => {
		const { error: githubError } = await event.locals.supabase.auth.signInWithOAuth({
			provider: 'github'
		});

		if (githubError) {
			throw error(500, githubError.message);
		}
	},
	signupWithDiscord: async (event) => {
		const { error: discordError } = await event.locals.supabase.auth.signInWithOAuth({
			provider: 'discord'
		});

		if (discordError) {
			throw error(500, discordError.message);
		}
	}
};
