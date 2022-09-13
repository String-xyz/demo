<script lang="ts">
	import { activeTab, collection, connect, currentAccount, getOwnedIDs } from '$lib/stores'
	import { onMount } from 'svelte';
	import Price from '$lib/components/Price.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	onMount(() => {
		activeTab.set(1);
		connect();
	});
</script>


<div class="flex flex-col w-full p-10 main">
	<h2 class="text-4xl font-extrabold">My Collection</h2>
	<div class="my-10">
		<p>View your NFTs</p>
	</div>
	
	<div class="grid showcase gap-3">
		{#if $currentAccount}
			{#await getOwnedIDs() }
				<div class="m-auto">
					<Spinner />
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
				{#if $collection.length == 0}
					<div class="m-auto">
						<div class="card bg-base-100 shadow-xl">
							<div class="card-body">
								<h2 class="card-title">Your collection is empty</h2>
							</div>
						</div>
					</div>
				{/if}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		{:else}
			<div class="m-auto">
				<div class="card bg-base-100 shadow-xl">
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

	@media (max-width: 500px) {
		.main {
			margin-left: 16px;
			margin-right: 16px;
			width: calc(100% - 32px);
		}
	}

	.showcase {
		grid-template-columns: repeat(4, minmax(250px, 1fr));
	}

	@media (max-width: 1100px) {
		.showcase {
			grid-template-columns: repeat(3, minmax(250px, 1fr));
		}
	}
	
	@media (max-width: 830px) {
		.showcase {
			grid-template-columns: repeat(2, minmax(250px, 1fr));
		}
	}

	@media (max-width: 600px) {
		.showcase {
			grid-template-columns: repeat(1, minmax(250px, 1fr));
		}
	}

</style>