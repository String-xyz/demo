import { writable, get as getStore, type Writable } from 'svelte/store';
import type { NFT } from './nfts';
import { getQuote, type TransactPayload } from './payment';

export const finalQuote: Writable<TransactPayload> = writable();
export const quote: Writable<TransactPayload> = writable();
export const quoteItem: Writable<NFT> = writable();

export const quoteInterval: Writable<NodeJS.Timer> = writable();

export const refreshQuote = async (userAddr: string) => {
	const refreshQuote = async () => {
		try {
			quote.set(await getQuote(getStore(quoteItem), userAddr));
		} catch (e) {
			console.error(e);
		}
	};

	await refreshQuote();

	if (getStore(quoteInterval)) {
		clearInterval(getStore(quoteInterval))
	}

	quoteInterval.set(setInterval(refreshQuote, 10000));
};
