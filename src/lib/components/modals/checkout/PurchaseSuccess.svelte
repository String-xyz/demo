<script lang="ts">
	import ModalBase from './ModalBase.svelte';
	import { ModalManager, type NFT } from '$lib/stores';

	import PurchaseSummary from '$lib/components/PurchaseSummary.svelte';

	export let txID: string;
	export let item: NFT;

	const clear = () => {
		ModalManager.set(null);
	};
</script>

<ModalBase title="You purchased this item!">
	<img class="mx-auto mt-4 item" src={item.imageSrc} alt={item.imageAlt} />
	<div class="divider" />
	<PurchaseSummary {item} final={true} />
	<div class="text-center">
		<a href="https://testnet.snowtrace.io/tx/{txID}" target="_blank" rel="noreferrer noopener">
			<button class="btn btn-outline btn-primary rounded border-2 normal-case"
				>View Transaction</button
			>
		</a>
		<a href="/">
			<button on:click={clear} class="btn btn-primary rounded border-2 normal-case "
				>Continue Shopping</button
			>
		</a>
	</div>
</ModalBase>

<style>
	.item {
		max-width: 100px;
		max-height: 100px;
	}
</style>
