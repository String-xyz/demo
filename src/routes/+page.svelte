<script lang="ts">
	import { onMount } from 'svelte';

	import { activeTab } from '$lib/stores';
	import { nfts } from '$lib/services/nft.service';

	import Card from '$lib/components/Card.svelte';

	onMount(() => {
		activeTab.set(0);
	});
</script>

<svelte:head>
	<title>String Demo</title>
</svelte:head>

<div class="flex flex-col w-full p-10 main">
	<h2 class="text-4xl font-extrabold pb-10">Mint an NFT With Your Credit Card</h2>
	<div class="mb-10">
		<p class="mb-4">
			Integrating with String allows Web3 platforms to enable their users to initiate any on-chain
			activity directly with their credit card, without ever leaving their platform’s experience.
		</p>
		<p>
			Test it out by minting an NFT with your credit card! Connect your wallet, select an NFT on
			your test network of choice (Ethereum, Avalanche, Polygon, or Arbitrum), and checkout. Enter 4242 4242
			4242 4242 as the card number, any future date for the expiration, and any 3-digit number for
			the CVV.
		</p>
		<p class="mt-1">
			You can also test our service with a real credit card by going into production mode with the toggle at the top right. But please note that you will have to contact support to refund your purchase.
		</p>
	</div>

	<div class="grid gap-3 showcase">
		{#each nfts as item}
			<a href={`nfts/${item.id}`}>
				<Card {item} />
			</a>
		{/each}
	</div>
</div>

<style>
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
		}

		.main {
			padding-left: 0;
			padding-right: 0;
		}
	}
</style>
