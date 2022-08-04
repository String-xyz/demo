<script lang="ts">
	import type { NFT } from '$lib/stores/modules/nfts';
	import CardPaymentForm from './CardPaymentForm.svelte';
	import CryptoPaymentForm from './CryptoPaymentForm.svelte';

	export let showModal = false;
	export let isCardTransaction = false;
	export let item: NFT;
</script>

{#if showModal}
	<div class="backdrop" on:click|self>
		<div class="modal">
			{#if isCardTransaction}
				<CardPaymentForm {item} />
			{:else}
				<!-- <CryptoPaymentForm {item}/> -->
			{/if}
		</div>
	</div>
{/if}

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.8);
	}
	.modal {
		padding: 10px;
		border-radius: 10px;
		max-width: 400px;
		overflow: auto;
		margin: 5% auto;
		text-align: center;
		background: white;
		user-select: none;
	}
</style>
