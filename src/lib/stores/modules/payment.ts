import { currentUser } from '$lib/stores/modules/auth';
import { post } from '$lib/services/api';
import { get as getStore } from 'svelte/store';
import type { NFT } from './nfts';

export interface Quote {
	success: boolean;
	data: {
		estimate: {
			timestamp: number;
			baseUSD: number;
			gasUSD: number;
			tokenUSD: number;
			serviceUSD: number;
			totalUSD: number;
		};
		signature: string;
	};
}

export const getQuote = async (item: NFT): Promise<Quote> => {
	const data = JSON.stringify(process(item));
	return (await post('transact/quote', data)) as Quote;
};

export const transact = async (item: NFT, token: string, quote: Quote): Promise<any> => {
	const data = { ...process(item), cardToken: token, quote: quote.data };
	return await post('transact', JSON.stringify(data));
};

const process = (item: NFT): object => {
	const userAddress =
		getStore(currentUser)?.address ?? '0x44A4b9E2A69d86BA382a511f845CbF2E31286770';

	const data = {
		chainID: 43113,
		userAddress: userAddress,
		contractAddress: item.address,
		contractABI: ['function mintTo(address recipient) payable returns (uint256)'],
		contractFunction: 'mintTo',
		contractParameters: [userAddress],
		txValue: (item.price * 1e18).toString(),
		gasLimit: '8000000'
	};
	return data;
};
