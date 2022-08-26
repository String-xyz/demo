<script lang="ts">
	import type { NFT } from '$lib/stores';
	import Price from './Price.svelte';

	export let item: NFT;
</script>

<div class="flex justify-start mt-4">
	<img class="item" src={item.imageSrc} alt={item.imageAlt} />
	<div class="ml-4">
		<div class="text-bold text-black">{item.name}</div>
		<div class="overflow-auto h-20 mt-4">{item.description}</div>
		<Price {item} />
	</div>
</div>

<style>
	.item {
		max-width: 100px;
		max-height: 100px;
	}
</style>
