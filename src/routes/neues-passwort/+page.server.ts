import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { resetSchema } from './ZodSchemas';
import { supabaseAdmin } from '$lib/server/supabase-admin';

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

		const { error: pwResetError } = await supabaseAdmin.auth.resetPasswordForEmail(form.data.email);

		if (pwResetError) {
			console.log(pwResetError.message);
			throw error(500, pwResetError.message);
		}
	}
};
