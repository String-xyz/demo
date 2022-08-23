<script lang="ts">
	import ModalBase from './ModalBase.svelte';
	import { ModalManager, type NFT } from '$lib/stores';

	import NFTDetails from '$lib/components/NFTDetails.svelte';
	import OrderConfirmation from './OrderConfirmation.svelte';

	export let item: NFT;

	const back = () => {
		ModalManager.set(OrderConfirmation);
	};
</script>

<ModalBase title="Purchase failed">
	<NFTDetails {item} />
	<div class="divider" />
	<p class="text-red-500">We are unable to complete your purchase due to an API error</p>
	<div class="text-center mt-4">
		<button class="btn btn-outline btn-primary rounded border-2 normal-case">Pay w/ Crypto</button>
		<button class="btn btn-primary rounded border-2 normal-case " on:click={back}>Try Again</button>
	</div>
</ModalBase>
