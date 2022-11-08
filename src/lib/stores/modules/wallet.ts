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

// import { readable, type Readable } from 'svelte/store';
// import { ethers } from 'ethers';

// const provider = new ethers.providers.Web3Provider(window.ethereum)

// export const currentAccount: Readable<string> = readable("", function start(set) {
// 	let provider = ethers.providers.Web3Provider(window.ethereum)

// 	return function stop() {
// 		clearInterval(interval);
// 	};
// });