const baseUrl = import.meta.env.VITE_API_BASE_PATH;

export const post = async (path: string, body: any = undefined) => {
	try {
		const result = await fetch(`${baseUrl}/${path}`, {
			method: 'POST',
			body: body,
			headers: { 'Content-Type': 'application/json' }
		});
		if (result.ok) {
			return result.json();
		} else {
			return { status: result.status };
		}
	} catch (e) {
		return { data: undefined, error: e };
	}
};

export const get = async (path: string) => {
	try {
		const result = await fetch(`${baseUrl}/${path}`);
		if (result.ok) {
			return result.json();
		} else {
			return { status: result.status };
		}
	} catch (e) {
		return { data: undefined, error: e };
	}
};

export const getStatus = async () => {
	const result = await get('healthcheck');
	const geoRestricted = result.status == 401;
	const APIError = result.error !== undefined;

	return { geoRestricted, APIError };
};

// ADD other HTTP Method below
