import { createChainStore } from 'ethers-svelte';
import { writable, type Writable } from 'svelte/store';

const { useWeb3Provider, chainStore } = createChainStore();
export const currentAccount: Writable<string> = writable('');
export const currentChainID: Writable<number> = writable(-1);
export const curerntSigner:Writable<any> = writable(null);

export const connect = () => {
	useWeb3Provider(window.ethereum);
    chainStore.subscribe( (store: any)  => {
        console.log(store)
        currentAccount.set(store.account);
        currentChainID.set(store.chainId);
        curerntSigner.set(store.signer);
    });
};
