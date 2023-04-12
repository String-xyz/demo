<script lang="ts">
	import { onMount } from 'svelte';
	import { connected } from 'svelte-ethers-store'

	import { activeTab } from '$lib/stores'
	import { getCollection } from '$lib/services/nft.service';

	import Spinner from '$lib/components/Spinner.svelte';
	import Card from '$lib/components/Card.svelte';

	onMount(() => {
		activeTab.set(1);
	});

</script>

<svelte:head>
	<title>My Collection | String Demo</title>
</svelte:head>

<div class="flex flex-col w-full main">
	<h2 class="text-3xl font-extrabold ml-10 my-8">My Collection</h2>
	<div class="ml-10 mb-6">
		<p>View your NFTs</p>
	</div>
	
	<div class="grid showcase gap-3 p-10">
		{#if $connected}
			{#await getCollection()}
				<div class="m-auto">
					<Spinner />
				</div>
			{:then collection}
				{#each collection as item}
					<Card {item} />
				{/each}
				{#if collection.length == 0}
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
		row-gap: 3rem;
	}

	@media (max-width: 1400px) {
		.showcase {
			grid-template-columns: repeat(3, minmax(250px, 1fr));
		}
	}
	
	@media (max-width: 1100px) {
		.showcase {
			grid-template-columns: repeat(2, minmax(250px, 1fr));
		}
	}

	@media (max-width: 800px) {
		.showcase {
			grid-template-columns: repeat(1, minmax(250px, 1fr));
			align-self: center;
			padding-left: 0;
			padding-right: 0;
		}
	}

</style>