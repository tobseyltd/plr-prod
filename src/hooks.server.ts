import { ENV } from '$lib/server/env';
import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';
import { sitemapHook } from 'sveltekit-sitemap';
import { sitemap } from './sitemap';
import { getLessonEps } from '$lib/helpers';

export const handle: Handle = async ({ event, resolve }) => {
	sitemapHook(sitemap, {
		getRoutes: async (event) => {
			const lessonIds = await getLessonEps();

			const dynamicRouteDefinitions = lessonIds.map((lessonId) => ({
				path: `/lektionen/ep-${lessonId}`,
				priority: '0.5'
				// Add other properties as needed
			}));

			return {
				'/': {
					path: '/',
					priority: '1.0'
				},
				'/lektionen': {
					path: '/lektionen',
					priority: '0.8'
				},
				'/mitglied-werden': {
					path: '/mitglied-werden',
					priority: '0.8'
				},
				'/lektionen/ep-[id]': dynamicRouteDefinitions
			};
		},

		getRobots: async (event) => {
			return {
				userAgent: '*',
				crawlDelay: undefined,
				paths: {
					'/admin': false,
					'/secret-page': false,
					'/account': false,
					'/impressum': false,
					'/datenschutz': false,
					'/agb': false,
					'/logout': false,
					'/login': false,
					'/neues-passwort': false,
					'/password-updaten': false,
					'/auth': false,
					'/api': false
				}
			};
		}
	});

	event.locals.supabase = createServerClient(
		ENV.PUBLIC_SUPABASE_URL,
		ENV.PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				/**
				 * Note: You have to add the `path` variable to the
				 * set and remove method due to sveltekit's cookie API
				 * requiring this to be set, setting the path to an empty string
				 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
				 */
				set: (key, value, options) => {
					event.cookies.set(key, value, { ...options, path: '/' });
				},
				remove: (key, options) => {
					event.cookies.delete(key, { ...options, path: '/' });
				}
			}
		}
	);

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
