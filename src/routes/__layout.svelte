<script lang="ts">
	import '../app.css';
	import { connect, disconnect, currentAccount, activeTab } from '$lib/stores';
</script>

<div class="mx-auto h-screen">
	<div class="flex flex-col drawer-content">
		<div class="w-full navbar justify-between bg-white text-dark-content border-base-300">
			<div class="flex-1 px-2 mx-2">
				<a class="btn btn-ghost btn-lg rounded-btn text-primary" href="/"><img src="/assets/string_text_logo.svg" width='135px' height='20px' alt="String"></a>
			</div>

			<div class="px-2 mx-2">
				{#if $currentAccount}
					<button class="btn btn-outline btn-sm rounded-btn btn-secondary" on:click={disconnect}>
						{$currentAccount.substring(0, 10) + '...'}
					</button>
				{:else}
					<button class="btn btn-outline btn-sm rounded-btn btn-primary" on:click={connect}>
						Connect Wallet
					</button>
				{/if}
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

	@media (max-width: 400px) {
		.navbar {
			flex-direction: column;
			margin-bottom: 16px;
		}
	}

</style>
