import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { resetSchema } from './ZodSchemas';

export const load: PageServerLoad = async () => {
	return {
		resetForm: await superValidate(zod(resetSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(resetSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { error: pwResetError } = await event.locals.supabase.auth.resetPasswordForEmail(
			form.data.email,
			{
				redirectTo: 'https://www.programmieren-lernen.rocks/passwort-updaten'
			}
		);

		if (pwResetError) {
			throw error(500, pwResetError.message);
		}

		return { form };
	}
};
