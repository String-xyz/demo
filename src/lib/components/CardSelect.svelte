<script lang="ts">
	import { card, ModalManager, type Card } from '$lib/stores';
	import CardDetails from './modals/checkout/CardDetails.svelte';

	let selected: any;

	const selectCard = () => {
		if (selected == 'addCard') {
			card.set(<Card>{});
			ModalManager.set(CardDetails);
		}
	};

	const showCardDetails = () => {
		ModalManager.set(CardDetails);
	};
</script>

{#if $card?.token}
	<div class="mt-4">
		<p>Card number</p>
		<select
			bind:value={selected}
			on:change={selectCard}
			class="select select-bordered border-2 w-full mt-1"
		>
			<option selected>{$card.scheme} {$card.last4}</option>
			<option value="addCard">Use other card</option>
		</select>
	</div>
{:else}
	<div class="flex justify-between mt-4	">
		<span>Card number</span><span class="link link-primary" on:click={showCardDetails}
			>Add Card</span
		>
	</div>
{/if}
