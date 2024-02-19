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

export const randomString = () => Math.random().toString(36).slice(2);
