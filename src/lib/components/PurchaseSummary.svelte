<script lang="ts">
	import { quote, refreshQuote, finalQuote, currentAccount, getBlockExplorer, type NFT } from '$lib/stores';
	import { abbrev } from '$lib/stores';
	import { onMount, onDestroy } from 'svelte';
	import Countdown from './Countdown.svelte';
	import { fade } from 'svelte/transition';

	export let item: NFT;
	export let final = false;
	export let txID = "";

	let quoteInterval: any;

	onMount(async () => {
		if (!quoteInterval) {
			quoteInterval = await refreshQuote(item, $currentAccount);
		}
	});

	onDestroy(() => {
		clearInterval(quoteInterval);
	});

	$: quoted = $quote?.data?.quote.estimate;
</script>

{#if final}
	<span class="text-xl font-bold mt-9">Purchase summary</span>
	<div class="flex justify-between mt-4">
		<span>Transaction</span>
		<span>
			<a href={getBlockExplorer(item.chainID) + txID} target='_blank' rel='noreferrer'>
				<span class="text-primary mr-3">{abbrev(txID)}</span>
				<img class="inline" src="/assets/external_link.svg" alt="Ext Link" />
			</a>
		</span>
	</div>
	<div class="flex justify-between mt-2">
		<span>Date</span><span>{new Date().toLocaleString('en-US')}</span>
	</div>
	<div class="flex justify-between mt-2 mb-6">
		<span>Total</span><span>$ {$finalQuote?.data?.quote.estimate.totalUSD.toFixed(2)}</span>
	</div>

{:else}
	<div class="flex justify-between mt-9">
		<span class="text-xl font-bold">Purchase summary</span>
	</div>
	{#if quoted}
		<div class="text-sm mt-5">
		<div class="flex justify-between">
			{#key quoted}
				<span>Item price</span><span in:fade>$ {quoted.baseUSD.toFixed(2)}</span>
			{/key}
		</div>
		<div class="flex justify-between mt-2">			
			{#key quoted}
				<span>Network fee</span><span in:fade>$ {quoted.gasUSD.toFixed(2)}</span>
			{/key}
		</div>
		<div class="flex justify-between mt-2">
			{#key quoted}
			<span>Service fee</span><span in:fade>$ {quoted.serviceUSD.toFixed(2)}</span>
			{/key}
		</div>
		</div>
		<div class="divider" />
		<div class="flex justify-between mb-4 text-xl">
			{#key quoted}
				<span class="font-bold">Total</span><span in:fade>$ {quoted.totalUSD.toFixed(2)}</span>
			{/key}
		</div>
		<div class="flex justify-between mt-3">
			<span class="text-xs">
				Price update in
			</span>
			<Countdown />
		</div>
	{:else}
		<h1 class="my-5 text-center">Waiting for Quote</h1>
	{/if}
{/if}
