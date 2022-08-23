<script lang="ts">
	import ModalBase from './ModalBase.svelte';
	import { ModalManager, type NFT } from '$lib/stores/';

	import { onMount } from 'svelte';
	import { getStatus } from '$lib/services/api';

	import NFTDetails from '$lib/components/NFTDetails.svelte';
	import OrderDetails from './OrderDetails.svelte';

	export let item: NFT;

	let geoRestricted: boolean;
	let APIError: boolean;

	onMount(async () => {
		({ geoRestricted, APIError } = await getStatus());
	});

	const payWithCard = () => {
		ModalManager.set(OrderDetails);
	};
</script>

<ModalBase title="Complete checkout">
	<NFTDetails {item} />
	<div class="mt-6 text-center">
		<button class="btn btn-outline btn-primary rounded border-2 normal-case">Pay w/ Crypto</button>
		<button
			class="btn btn-primary rounded border-2 normal-case "
			on:click={payWithCard}
			disabled={geoRestricted || APIError}>Pay w/ Card</button
		>
		{#if geoRestricted}
			<div
				class="tooltip tooltip-primary tooltip-left"
				data-tip="Unfortunately, we cannot serve your state due to local laws."
			>
				<img src="/images/question_icon.svg" alt="question" />
			</div>
		{:else if APIError}
			<div
				class="tooltip tooltip-primary tooltip-left"
				data-tip="Unfortunately, we are unable to contact our API at this moment."
			>
				<img src="/images/question_icon.svg" alt="question" />
			</div>
		{/if}
	</div>
</ModalBase>
