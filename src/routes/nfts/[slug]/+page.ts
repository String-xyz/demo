import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const id = Number(params.slug);

	if (!id) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return { id };
}) satisfies PageLoad;
