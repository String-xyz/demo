<script lang="ts">
	import ModalBase from "./ModalBase.svelte";
	import { ModalManager, type NFT } from "$lib/stores";
	
	import NFTDetails from "$lib/components/NFTDetails.svelte";
	import PurchaseSummary from "$lib/components/PurchaseSummary.svelte";
	import CheckoutOption from "./CheckoutOption.svelte";
	import OrderConfirmation from "./OrderConfirmation.svelte";

	export let item: NFT;

	const back = () => {
		ModalManager.set(CheckoutOption)
	}

	const next = () => {
		ModalManager.set(OrderConfirmation)
	}
</script>

  
<ModalBase title="Pay with Card">
	<NFTDetails {item} />
	<div class="divider" />
	<PurchaseSummary {item} />
	<div class="text-center">
		<button on:click={back} class="btn btn-outline btn-primary rounded border-2 normal-case">Back</button>
		<button on:click={next} class="btn btn-primary rounded border-2 normal-case ">Next</button>
	</div>
</ModalBase>
