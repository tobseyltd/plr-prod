import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '../../account/ZodSchema';
import { getSubscriptionTier } from '$lib/server/subscriptions';
import { getPaymentStatus } from '$lib/server/onetime';
import { commentSchema } from './ZodSchemas';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	async function getLesson(ep: string) {
		const { error: contactError, data: contact } = await event.locals.supabase
			.from('lessons')
			.select('*')
			.eq('ep', ep.toLocaleUpperCase())
			.limit(1)
			.maybeSingle();

		if (contactError) {
			throw error(500, 'Error fetching contact. Please try again later.');
		}
		if (!contact) {
			throw error(404, 'Contact not found.');
		}
		return contact;
	}

	async function getWildcard(member: string) {
		const { data: wildcard, error: wildcardError } = await event.locals.supabase
			.from('profiles')
			.select('wildcard')
			.eq('id', member);

		if (wildcardError) {
			throw error(500, 'Error getting wildcard status.');
		}

		return Object.values(wildcard[0])[0];
	}
	return {
		lesson: await getLesson(event.params.ep.match(/[0-9]/g).join('')),
		loginForm: await superValidate(zod(loginSchema)),
		tier: session && (await getSubscriptionTier(session.user.id)),
		paymentStatus: session && (await getPaymentStatus(session.user.id)),
		commentForm: await superValidate(zod(commentSchema)),
		wildcard: session && (await getWildcard(session.user.id))
	};
};
