import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { emailSchema } from '../account/ZodSchema';

export const load: PageServerLoad = async () => {
	return {
		resetForm: await superValidate(zod(emailSchema))
	};
};

export const actions: Actions = {
	resetPassword: async (event) => {
		const form = await superValidate(event, zod(emailSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error: pwResetError } = await event.locals.supabase.auth.resetPasswordForEmail(
			form.data.email,
			{
				redirectTo: '/account'
			}
		);

		if (pwResetError) {
			throw error(500, pwResetError.message);
		}
	}
};
