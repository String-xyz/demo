import { writable, type Writable, get as getStore } from 'svelte/store';
import { createChainStore } from 'ethers-svelte';
import { post, get } from '$lib/services/api';

interface User {
	id: string;
	address: string;
	nonce: string;
	entityType: string;
	created?: number;
}

const { chainStore, signer } = createChainStore();
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

interface Token {
	token: string;
	expire: string;
}

interface AuthToken {
	AuthToken: Token;
	refreshToken: Token;
}

export const currentUser: Writable<User | undefined> = writable(undefined);
export const currentToken: Writable<string> = writable('');

export const registerUser = async () => {
	const chain = getStore(chainStore);
	if (chain.account === '') return;
	const result = await post(
		'/auth/register?entityType=user',
		JSON.stringify({ address: chain.account, entityType: 'user' })
	);
	const { data } = result;
	currentUser.set(data as User);
};

export const registerCustomer = async (name: string, email: string) => {
	const result = await post(
		'/auth/register?entityType=customer',
		JSON.stringify({ name, email, entityType: 'user' })
	);
	const { data } = result;
	currentUser.set(data as User);
};

export const getNonce = async (address: string) => {
	const url = `/auth/${address}`;
	const result = await get(url);
	const { data } = result;
	return data;
};

export const loginUser = async () => {
	const sign = getStore(signer);
	const user = getStore(currentUser);
	const chain = getStore(chainStore);
	let nonce = '';

	if (!user?.nonce) {
		const chain = getStore(chainStore);
		const { nonce } = await getNonce(chain.account);
	}

	try {
		const signature = await sign.signMessage(`sign this message: ${nonce}`);
		const result = await post('auth/login', { address: chain.account, signature: signature });
		const { data } = result;
		const token = data as AuthToken;
		currentToken.set(token.AuthToken.token);

		return token;
	} catch (e) {
		console.log(e);
	}
};

export const loginCustomer = async () => {
	try {
		const result = await post('/auth/token', { clientId, clientSecret });
		console.log(result);
		const { data } = result;
		const token = data as AuthToken;
		currentToken.set(token.AuthToken.token);

		return token;
	} catch (e) {
		console.log(e);
	}
};

export const signPayload = async (payload: string): Promise<string> => {
	const sign = getStore(signer);
	try {
		const signature = await sign.signMessage(payload);
		return signature;
	} catch (e) {
		throw e;
	}
};
