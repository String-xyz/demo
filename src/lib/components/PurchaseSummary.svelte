<script lang="ts">
	import { quote, refreshQuote, finalQuote, currentAccount, type NFT } from '$lib/stores';
	import { onMount, onDestroy } from 'svelte';
	import CountdownBar from './CountdownBar.svelte';

	export let item: NFT;
	export let final = false;

	let quoteInterval: any;

	onMount(async () => {
		quoteInterval = await refreshQuote(item, $currentAccount);
	});

	onDestroy(() => {
		clearInterval(quoteInterval);
	});

	$: quoted = $quote?.data?.quote;
</script>

{#if final}
	<span>Purchase summary</span>
	<div class="flex justify-between mt-4">
		<span>Item</span><span>{item.name}</span>
	</div>
	<div class="flex justify-between mt-2 mb-12">
		<span>Total</span><span>$ {$finalQuote?.data?.quote.estimate.totalUSD.toFixed(2)}</span>
	</div>
{:else}
	<div class="flex justify-between">
		<span class="whitespace-nowrap">Purchase summary</span>
		<div
			class="tooltip tooltip-primary"
			data-tip="Your quote updates every 10 seconds before you purchase"
		>
			<img src="/images/question_icon.svg" alt="question" />
		</div>
		<CountdownBar />
	</div>
	{#if quoted}
		<div class="flex justify-between">
			<span>Item price</span><span>$ {quoted.estimate.baseUSD.toFixed(2)}</span>
		</div>
		<div class="flex justify-between mt-2">
			<span>Gas fee</span><span>$ {quoted.estimate.gasUSD.toFixed(2)}</span>
		</div>
		<div class="flex justify-between mt-2">
			<span>Service fee</span><span>$ {quoted.estimate.serviceUSD.toFixed(2)}</span>
		</div>

		<div class="divider" />
		<div class="flex justify-between mb-4">
			<span>Total</span><span>$ {quoted.estimate.totalUSD.toFixed(2)}</span>
		</div>
	{:else}
		<h1 class="mb-5 text-center">Waiting for Quote</h1>
	{/if}
{/if}
