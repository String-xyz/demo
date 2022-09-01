import { post } from '$lib/services/api';
import { get as getStore, writable, type Writable } from 'svelte/store';
import type { NFT } from './nfts';
export interface Quote {
	estimate: {
		timestamp: number;
		baseUSD: number;
		gasUSD: number;
		tokenUSD: number;
		serviceUSD: number;
		totalUSD: number;
	};
	signature: string;
}

export interface TransactPayload {
	success: boolean;
	data: {
		chainID: number;
		userAddress: string;
		contractAddress: string;
		contractABI: string[];
		contractFunction: string;
		contractParameters: string[];
		txValue: string;
		gasLimit: string;
		type: number;
		quote: Quote;
		cardToken: string;
	};
}

export interface Card {
	token: string;
	scheme: string;
	last4: number;
}

export const card: Writable<Card> = writable();

export const getQuote = async (item: NFT, userAddr: string): Promise<TransactPayload> => {
	const data = JSON.stringify(process(item, userAddr));
	return (await post('transact/quote', data)) as TransactPayload;
};

export const transact = async (item: NFT, token: string, quote: TransactPayload): Promise<any> => {
	quote.data.cardToken = getStore(card).token;
	return await post('transact', JSON.stringify(quote.data));
};

const process = (item: NFT, userAddr: string): object => {
	const data = {
		chainID: item.chainID,
		userAddress: userAddr,
		contractAddress: item.address,
		contractABI: ['function mintTo(address recipient) payable returns (uint256)'],
		contractFunction: 'mintTo',
		contractParameters: [userAddr],
		txValue: (item.price * 1e18).toString(),
		gasLimit: '8000000'
	};
	return data;
};
