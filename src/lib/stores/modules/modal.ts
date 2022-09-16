import { writable, type Writable } from 'svelte/store';

export const ModalManager: Writable<any> = writable();
export const ModalProps: Writable<any> = writable({});
