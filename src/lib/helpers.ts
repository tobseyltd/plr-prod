import { error, type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';

export function handleLoginRedirect(event: RequestEvent) {
	const redirectTo = event.url.pathname + event.url.search;
	return `/?redirectTo=${redirectTo}`;
}

export async function getUserProfile(event: ServerLoadEvent) {
	const { error: profileError, data: profile } = await event.locals.supabase
		.from('profiles')
		.select('*')
		.limit(1)
		.single();

	if (profileError) {
		throw error(500, 'Error retreiving your profile, please try again later.');
	}
	return profile;
}

export async function getLessonEps() {
	const { data: eps, error: epError } = await event.locals.supabase.from('lessons').select('ep');

	if (epError) {
		throw error(500, 'Could not get EPs');
	}

	return eps;
}

export const randomString = () => Math.random().toString(36).slice(2);
