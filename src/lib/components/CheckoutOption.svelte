<script lang="ts">
	import { ModalManager } from '$lib/stores/';

	import { onMount } from 'svelte';
	import { getStatus } from '$lib/services/api';

	import OrderDetails from './modals/checkout/OrderDetails.svelte';

	let geoRestricted: boolean;
	let APIError: boolean;

	onMount(async () => {
		({ geoRestricted, APIError } = await getStatus());
	});

	const payWithCard = () => {
		ModalManager.set(OrderDetails);
	};
	
</script>

<div class="my-6 text-center">
	<button class="btn btn-outline btn-primary rounded border-2 normal-case m-1">Mint with Crypto</button>
	<button
		class="btn btn-primary rounded border-2 normal-case "
		on:click={payWithCard}
		disabled={geoRestricted || APIError}>Mint with Card</button
	>
	{#if geoRestricted}
		<div
			class="tooltip tooltip-primary tooltip-left"
			data-tip="Unfortunately, we cannot serve your state due to local laws."
		>
			<img src="/assets/question_icon.svg" alt="question" />
		</div>
	{:else if APIError}
		<div
			class="tooltip tooltip-primary tooltip-left"
			data-tip="Unfortunately, we are unable to contact our API at this moment."
		>
			<img src="/assets/question_icon.svg" alt="question" />
		</div>
	{/if}
</div>