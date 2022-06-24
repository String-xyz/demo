import { writable, type Writable , get as getStore} from "svelte/store";
import { createChainStore } from "ethers-svelte";
import {post, get } from '$lib/services/api';

const { useWeb3Provider, chainStore, signer } = createChainStore();
const baseurl = import.meta.env.VITE_PUBLIC_BASE_PATH

interface User { 
    id: string;
    address: string;
    nonce: string;
    entityType: string;
    created?: number;
}

export const currentUser: Writable<User | undefined> = writable(undefined)

export const connect = () => { 
    useWeb3Provider(window.ethereum);
}

export const register = async () => {
    const chain = getStore(chainStore)
    if (chain.account === "") return;

    const url = `${baseurl}/auth/register?entityType=user}`
    const resp = await fetch(url,{method: 'POST', body: JSON.stringify({address:chain.account, entityType:"user"})})
    const { data } = await resp.json()
    currentUser.set(data as User)
}

export const getNonce = async (address:string) => { 
    const url = `${baseurl}/auth/${address}` 
    const resp = await fetch(url)
    const { data } = await resp.json()
}

export const login = async () => {
    const sign = getStore(signer)
    const user = getStore(currentUser);
    const chain = getStore(chainStore);
    const { nonce } = user;
     try { 
        const signature = await sign.signMessage(`sign this message: ${nonce}`)
        const result = post("auth/login", {address:chain.account, signature: signature})
        console.log(result);
     } catch (e ) { 
        console.log(e)
     }
}
