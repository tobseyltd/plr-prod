import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	async function getLessons() {
		const { data: lessons, error: dbError } = await event.locals.supabase
			.from('lessons')
			.select('*')
			.order('created_at', { ascending: false });

		if (dbError) {
			throw error(500, 'Error fetching contacts, please try again later.');
		}
		return lessons;
	}

	return {
		lessons: await getLessons()
	};
};
