import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { passwordSchema } from '../account/ZodSchema';

export const load: PageServerLoad = async () => {
	return {
		resetPwForm: await superValidate(zod(passwordSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(passwordSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, 'passwordConfirm', 'Passwörter stimmen nicht überein!');
		}

		const { error: PasswordError } = await event.locals.supabase.auth.updateUser({
			password: form.data.passwordConfirm
		});

		if (PasswordError) {
			console.log(PasswordError.message);
			throw error(500, PasswordError.message);
		}

		return { form };
	}
};
