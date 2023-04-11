<script lang='ts'>
	import type { CollectionData, NFT } from "$lib/common/types";
	export let item: NFT | CollectionData;
</script>

<div class="text-black font-medium">
	<img class="token-logo" src={`/assets/tokens/${item.currency}.svg`} alt={item.currency + " Logo"} />
	<span>{item.price}</span>
	<span>{item.currency || 'AVAX'}</span>
</div>

<style>
	.token-logo {
		display: inline;
		max-width: 16px;
		max-height: 16px;
		margin-right: 4px;
	}
</style>