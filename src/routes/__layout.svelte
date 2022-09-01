<script lang="ts">
	import '../app.css';
	import { connect, disconnect, currentAccount, activeTab } from '$lib/stores';

	function onConnect() {
		connect();
	}

	function onDisconect() {
		disconnect();
	}
</script>

<div class="mx-auto h-screen">
	<div class="flex flex-col drawer-content">
		<div class="w-full navbar bg-white text-dark-content  border-base-300">
			<div class="flex-1 px-2 mx-2">
				<a class="btn btn-ghost btn-lg rounded-btn text-primary" href="/"><img src="/assets/string_text.svg" alt="String"></a>
			</div>

			<div class="flex-none hidden px-2 mx-2 lg:flex">
				<div class="flex items-stretch">
					{#if $currentAccount}
						<button class="btn btn-outline btn-sm rounded-btn btn-secondary" on:click={onDisconect}>
							{$currentAccount.substring(0, 10) + '...'}
						</button>
					{:else}
						<button class="btn btn-outline btn-sm rounded-btn btn-primary" on:click={onConnect}>
							Connect Wallet
						</button>
					{/if}
				</div>
			</div>

		</div>
		<div class="tabs ml-10">
			<a class="tab tab-bordered" class:tab-active="{$activeTab == 0}" href="/">Explore</a> 
			<a class="tab tab-bordered" class:tab-active="{$activeTab == 1}" href="/nfts/collection">My Collection</a> 
		</div>
		<div class="divider mt-0" />
		<slot />
	</div>
</div>

<style>
	.divider {
		height: 1px !important;
		z-index: -1;
	}
</style>
