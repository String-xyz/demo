<script lang="ts">
	import ModalBase from './ModalBase.svelte';
	import { card, quote, finalQuote, ModalManager, type NFT } from '$lib/stores'
	
	import PurchaseSummary from '$lib/components/PurchaseSummary.svelte';
	import CardSelect from '$lib/components/CardSelect.svelte';
	import Address from '$lib/components/Address.svelte';
	import OrderDetails from './OrderDetails.svelte';
	import Processing from './Processing.svelte';
	
	export let item: NFT;

	$:disabled = $card?.token == undefined || $quote?.data?.quote == undefined

	const purchase = () => {
		finalQuote.set($quote);
		ModalManager.set(Processing)
	}

	const back = () => {
		ModalManager.set(OrderDetails)
	}

</script>

<ModalBase title="Order confirmation">
	<CardSelect />
	<Address />
	<div class="divider"/>
	<PurchaseSummary {item} />
	<div class="text-center">
		<button on:click={back} class="btn btn-outline btn-primary rounded border-2 normal-case">Back</button>
		<button on:click={purchase} class="btn btn-primary rounded border-2 normal-case " {disabled}>Purchase</button>
	</div>
</ModalBase>