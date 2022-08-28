<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		const id = params.id;
		return { props: { id } };
	};
</script>

<script lang="ts">
	import { byId, connect, quote, type TransactPayload } from '$lib/stores';
	import CheckoutOption from '$lib/components/CheckoutOption.svelte';
  import Price from '$lib/components/Price.svelte';
	import { ModalManager, ModalProps } from '$lib/stores/';
  import { onMount } from 'svelte';

	export let id: string;
	$: item = byId(Number(id));

  onMount(() => {
    connect();
    quote.set(<TransactPayload>{});
    ModalManager.set(null);
    ModalProps.set({ item });
  });

</script>

<svelte:component this={$ModalManager} {...$ModalProps} />
{#if item}
  <div class="container flex m-auto">
    <img class="showcase" src={item.imageSrc} alt={item.imageAlt}>
    <div>
      <p class="text-primary text-lg font-bold">{item.collection}</p>
      <p class="text-black text-3xl font-bold mb-4">{item.name}</p>
      <p class=" mb-4">{item.description}</p>
      <p class="text-bold text-xl"><Price {item}/></p>

      <CheckoutOption />
    </div>
  </div>
{/if}


<style>
  .showcase {
    margin-left: 20px;
    margin-right: 128px;
    object-fit: contain;
    width: 400px;
    height: 400px;
  }
</style>