import { writable } from 'svelte/store';
import { post, get } from '$lib/services/api';

export const estimate = async (token: string): Promise<string> => {
	console.log(token)
	return '';
};

export const request = async (token: string): Promise<string> => {
	console.log(token)
	return '';
};

export const process = async (token: string): Promise<string> => {
	{
		userAddress: "0x44A4b9E2A69d86BA382a511f845CbF2E31286770"
 		contractAddress: "0x861af9ed4fee884e5c49e9ce444359fe3631418b"
 		contractABI: ["function mintTo(address recipient) payable returns(uint256)"]
 		contractFunction: "mintTo"
 		parameters: ['0x44A4b9E2A69d86BA382a511f845CbF2E31286770']
 		transactionParameters: {
			value: "80000000000000000"
		 	gasLimit: 8000000
		}
 		price: 0.08
 		cardToken: token
}
	console.log(token)
	return '';
};
