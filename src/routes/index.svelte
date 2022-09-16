<script context="module" lang="ts">
	import Price from '$lib/components/Price.svelte';
	import { nfts, activeTab } from '$lib/stores';
</script>

<script lang='ts'>
	activeTab.set(0);
</script>

<svelte:head>
	<title>String Demo</title>
</svelte:head>

<div class="flex flex-col w-full p-10 main">
	<h2 class="text-4xl font-extrabold pb-10">Mint an NFT With Your Credit Card
	</h2>
	<div class="mb-10">
		<p class="mb-4">Web3 Platforms integrating String enable their users to initiate any on-chain activity directly with their credit card, without ever leaving their platform’s experience.</p>
		<p>Test it out by minting an NFT with your credit card! Connect your wallet, select an NFT on your test network of choice (Ethereum, Avalanche, or Polygon), and checkout. Enter 4242 4242 4242 4242 as the card number, any future date for the expiration, and any 3-digit number for the CVV.</p>
	</div>

	<div class="grid gap-3 showcase">
		{#each nfts as item}
			<div class="card bg-base-100 shadow-xl">
				<figure><img class="item" src={item.imageSrc} alt={item.imageAlt} /></figure>
				<div class="card-body">
					<p class="text-sm font-medium text-primary">{item.collection}</p>
					<h2 class="card-title">
						<a href={`nfts/${item.id}`}>
							<span aria-hidden="true" class="absolute inset-0" />
							{item.name}
						</a>
					</h2>
					<p class="text-sm font-medium text-gray-900 mt-4">
						<Price {item} />
					</p>
				</div>
			</div>
		{/each}
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