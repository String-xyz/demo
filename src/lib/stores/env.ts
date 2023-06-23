import { writable, type Writable } from 'svelte/store';
import type { StringSDKEnvironment } from '@stringpay/sdk';
import config from '$lib/config';

export const stringSdkEnv: Writable<StringSDKEnvironment> = writable("SANDBOX");
export const stringSdkPublicKey: Writable<string> = writable(config.SBOX_API_KEY);