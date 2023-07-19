<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { defaultEvmStores, connected, signerAddress } from 'svelte-ethers-store';
	import { activeTab, prodWarningModalOpen, stringSdkEnv, stringSdkPublicKey } from '$lib/stores';
	import { capitalize } from '$lib/common/utils';
	import config from '$lib/config';

	import ProdWarning from '$lib/components/ProdWarning.svelte';

	let envToggle = false;

	// The toggle will switch between different envs based on the USE_LOCAL flag
	const defaultEnv = config.USE_LOCAL ? 'LOCAL' : 'SANDBOX';
	const toggledEnv = config.USE_LOCAL ? 'SANDBOX' : 'PROD';
	const defaultKey = config.USE_LOCAL ? config.LOCAL_API_KEY : config.SBOX_API_KEY;
	const toggledKey = config.USE_LOCAL ? config.SBOX_API_KEY : config.PROD_API_KEY;

	const connect = async () => {
		await defaultEvmStores.setProvider();
	};

	const disconnect = async () => {
		await defaultEvmStores.disconnect();
	};

	onMount(async () => {
		await connect();
	});

	const switchEnv = () => {
		if (envToggle && toggledEnv === 'PROD') {
			$prodWarningModalOpen = true;
		}

		const envToUse = envToggle ? toggledEnv : defaultEnv;
		const keyToUse = envToggle ? toggledKey : defaultKey;

		stringSdkEnv.set(envToUse);
		stringSdkPublicKey.set(keyToUse);
	}

</script>

<div class="mx-auto h-screen text-neutral">
	<div class="flex flex-col drawer-content">
		<div class="w-full navbar justify-between bg-white text-dark-content border-base-300">
			<div class="flex-1 px-2 mx-2">
				<a class="btn btn-ghost btn-lg rounded-btn text-primary" href="/">
					<img src="/assets/string_logo.svg" width="100px" height="20px" alt="String" />
				</a>
			</div>

			<div id="env-toggle" class="text-sm font-medium mr-2">
				<span class="mr-2">Using <span class="">{capitalize($stringSdkEnv)}</span> mode</span>
				<input type="checkbox" class="toggle" bind:checked={envToggle} on:change={switchEnv} />
			</div>

			<div class="px-2 mx-2">
				{#if $connected}
					<button class="btn btn-outline btn-sm rounded-btn btn-secondary" on:click={disconnect}>
						{$signerAddress.substring(0, 10) + '...'}
					</button>
				{:else}
					<button class="btn btn-outline btn-sm rounded-btn btn-primary" on:click={connect}>
						Connect Wallet
					</button>
				{/if}
			</div>
		</div>
		<div class="tabs ml-10">
			<a class="tab tab-bordered" class:tab-active={$activeTab == 0} href="/">Explore</a>
			<a class="tab tab-bordered" class:tab-active={$activeTab == 1} href="/nfts/collection">My Collection</a>
		</div>
		<div class="divider mt-0" />
		<slot />
	</div>

	<ProdWarning />
</div>

<style lang="postcss">
	.tab {
		@apply !text-neutral;
	}

	.tab-active {
		@apply !text-primary !border-primary;
	}

	.divider {
		height: 1px;
	}

	@media (max-width: 600px) {
		.navbar {
			flex-direction: column;
			margin-bottom: 16px;
		}

		#env-toggle {
			margin-bottom: 16px;
		}
	}
</style>
