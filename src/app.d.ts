/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { ExternalProvider } from "@ethersproject/providers";

declare global {
	namespace App {
		interface Locals {
			userid: string;
		}

		interface Window {
			ethereum?: ExternalProvider;
		}
	}
  }
