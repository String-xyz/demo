import { writable, type Writable } from 'svelte/store';
import type { StringSDKEnvironment } from '@stringpay/sdk';

export const stringSdkEnv: Writable<StringSDKEnvironment> = writable("SANDBOX");