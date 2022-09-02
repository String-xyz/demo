<script lang="ts">
	import Price from '$lib/components/Price.svelte';
	import { activeTab, collection, connect, currentAccount, getOwnedIDs } from '$lib/stores'
	import { onMount } from 'svelte';

	onMount(() => {
		activeTab.set(1);
		connect();
	});
</script>


<div class="flex flex-col w-full p-10">
	<h2 class="text-4xl font-extrabold pb-10">My Collection</h2>
	<div class="grid grid-cols-4 gap-2 pb-10">
		<div class="span-1">
			<p>View your NFTs</p>
		</div>
	</div>

	<div class="grid gap-3 grid-cols-4 row-auto-flow">
		{#if $currentAccount}
			{#await getOwnedIDs() }
				<div class="m-auto">
					<div class="card w-96 bg-base-100">
						<div class="card-body">
						<h2 class="card-title">Loading</h2>
						</div>
					</div>
				</div>
			{:then}
				{#each $collection as owned}
					<div class="card bg-base-100 shadow-xl">
						<figure><img class="item" src={owned.ownedURL} alt={owned.nft.imageAlt} /></figure>
						<div class="card-body">
							<p class="text-sm font-medium text-primary">{owned.nft.collection}</p>
							<h2 class="card-title">
								<span aria-hidden="true" class="absolute inset-0" />
								{owned.nft.name}
							</h2>
							<p class="text-sm font-medium text-gray-900 mt-4">
								<Price item={owned.nft} />
							</p>
						</div>
					</div>
				{/each}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		{:else}
			<div class="m-auto">
				<div class="card w-96 bg-base-100 shadow-xl">
					<div class="card-body">
					  <h2 class="card-title">Please connect your wallet</h2>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.item {
		max-width: 200px;
		max-height: 200px;
		margin-top: 16px;
	}

</style>