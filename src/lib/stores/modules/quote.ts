import { writable, type Writable } from "svelte/store";
import type { NFT } from "./nfts";
import { getQuote, type TransactPayload } from "./payment";

export const finalQuote: Writable<TransactPayload> = writable();
export const quote: Writable<TransactPayload> = writable();

export const refreshQuote = async (item: NFT, userAddr: string) => {
	const refreshQuote = async () => {
		try {
			quote.set(await getQuote(item, userAddr));
		} catch (e) {
			console.error(e);
		}
	};

	await refreshQuote();

	const interval = setInterval(refreshQuote, 10000);
	return interval;
}