const baseUrl = import.meta.env.VITE_PUBLIC_BASE_PATH;

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
			return result.status;
		}
	} catch (e) {
		return { data: undefined };
	}
};

export const get = async (path: string) => {
	try {
		const result = await fetch(`${baseUrl}/${path}`);
		if (result.ok) {
			return result.json();
		} else {
			return result.status;
		}
	} catch (e) {
		return { data: undefined };
	}
};

// ADD other HTTP Method below
