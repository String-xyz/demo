<script lang='ts'>
	import type { CollectionData, NFT } from '$lib/common/types';
	import Price from '$lib/components/Price.svelte';

	export let item: NFT | CollectionData;

	let nftImage = "ownedURL" in item ? item.ownedURL : item.imageSrc;
</script>

<div class="card w-80 bg-base-100 shadow-xl">
	<figure><img class="item" src={nftImage} alt={item.imageAlt} /></figure>
	<div class="card-body p-6">
		<p class="text-sm font-medium text-primary">
			{item.collection}
		</p>
		<h2 class="card-title">
			{item.name}
		</h2>
		<p class="text-sm font-medium">
			<Price {item} />
		</p>
	</div>
</div>

<style>
	.item {
		width: 100%;
	}
</style>