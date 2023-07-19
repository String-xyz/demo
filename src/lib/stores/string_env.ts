import { writable, type Writable } from 'svelte/store';
import type { StringSDKEnvironment } from '@stringpay/sdk';
import config from '$lib/config';

const defaultEnv = config.USE_LOCAL ? 'LOCAL' : 'SANDBOX';
const defaultKey = config.USE_LOCAL ? config.LOCAL_API_KEY : config.SBOX_API_KEY;

export const stringSdkEnv: Writable<StringSDKEnvironment> = writable(defaultEnv);
export const stringSdkPublicKey: Writable<string> = writable(defaultKey);