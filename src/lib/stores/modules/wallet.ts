// @ts-ignore
import { createChainStore } from 'ethers-svelte';
import { writable, type Writable } from 'svelte/store';

const { useWeb3Provider, chainStore } = createChainStore();
export const currentAccount: Writable<string> = writable('');
export const currentChainID: Writable<number> = writable(-1);
export const currentSigner: Writable<any> = writable(null);

export const connect = () => {
	// @ts-ignore
	useWeb3Provider(window.ethereum);
	chainStore.subscribe((store: any) => {
		currentAccount.set(store.account);
		currentChainID.set(store.chainId);
		currentSigner.set(store.signer);
	});
};

export const disconnect = () => {
	currentAccount.set('');
	currentChainID.set(-1);
	currentSigner.set(null);
};