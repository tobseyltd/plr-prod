import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	return { latestEpisodes: getLatestLessons(locals) };
};

async function getLatestLessons(locals: App.Locals) {
	const { data: latestEpisodes, error: dbError } = await locals.supabase
		.from('lessons')
		.select('*')
		.range(0, 2);

	if (dbError) throw error(500, 'Error fetching lessons');

	return latestEpisodes;
}
