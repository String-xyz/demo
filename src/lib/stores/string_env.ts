import { writable, type Writable } from 'svelte/store';
import type { StringSDKEnvironment } from '@stringpay/sdk';
import config from '$lib/config';

const env = config.USE_LOCAL ? 'LOCAL' : 'SANDBOX';
const key = config.USE_LOCAL ? config.LOCAL_API_KEY : config.SBOX_API_KEY;

export const stringSdkEnv: Writable<StringSDKEnvironment> = writable(env);
export const stringSdkPublicKey: Writable<string> = writable(key);