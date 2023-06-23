<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { defaultEvmStores, connected, signerAddress } from 'svelte-ethers-store';
	import { activeTab, stringSdkEnv } from '$lib/stores';
	import { capitalize } from '$lib/common/utils';

	let envToggle = false;

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
		envToggle = !envToggle;
		stringSdkEnv.set(envToggle ? 'PROD' : 'SANDBOX');
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

			<div class="text-sm font-medium mr-2">
				<span class="mr-2">Using <span class="">{capitalize($stringSdkEnv)}</span> mode</span>
				<input type="checkbox" class="toggle" bind:checked={envToggle} on:click={switchEnv} />
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

	@media (max-width: 400px) {
		.navbar {
			flex-direction: column;
			margin-bottom: 16px;
		}
	}
</style>
