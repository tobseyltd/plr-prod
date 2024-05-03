import type { PageServerLoad } from './$types';
import { getPaymentStatus } from '$lib/server/onetime';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();

	return {
		paymentStatus: session ? await getPaymentStatus(session.user.id) : null
	};
};
