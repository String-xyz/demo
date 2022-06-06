import { writable } from "svelte/store";
 interface User { 
    id: string;
    address: string;
    nonce: string;
    entityType: string;
    created?: number;
}

export const nonce  = writable("")
export const currentUser = writable()

export const register = async (address:string) => { 
    const url = `http://localhost:5000/auth/register` 
    const resp = await fetch(url,{method: 'POST', body: JSON.stringify({address:address, entityType:"user"})})
    const { data } = await resp.json()
    currentUser.set(data as User)
    return currentUser
}

export const getNonce = async (address:string) => { 
    const url = `http://localhost:5000/auth/${address}` 
    const resp = await fetch(url)
}