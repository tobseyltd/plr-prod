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
	default: async (event) => {
		const form = await superValidate(event, zod(emailSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { data, error: pwResetError } = await event.locals.supabase.auth.resetPasswordForEmail(
			form.data.email,
			{
				redirectTo: '/account'
			}
		);
		console.log(data);
		if (pwResetError) {
			console.log(pwResetError.message);
			throw error(500, pwResetError.message);
		}
	}
};
