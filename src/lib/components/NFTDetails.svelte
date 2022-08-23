<script lang="ts">
	import type { NFT } from '$lib/stores';

	export let item: NFT;
</script>

<div class="flex justify-start mt-4">
	<img class="item" src={item.imageSrc} alt={item.imageAlt} />
	<div class="ml-4">
		<div>{item.name}</div>
		<div>{item.description}</div>
		<div>{item.price} {item.currency}</div>
	</div>
</div>

<style>
	.item {
		max-width: 100px;
		max-height: 100px;
	}
</style>
