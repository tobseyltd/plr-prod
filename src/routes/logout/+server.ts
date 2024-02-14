import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { handleLoginRedirect } from '$lib/helpers';

export const POST: RequestHandler = async (event) => {
	const { error: logoutError } = await event.locals.supabase.auth.signOut();

	if (logoutError) {
		throw error(500, 'Error logging you out. Please try again.');
	}
	throw redirect(302, handleLoginRedirect(event));
};
