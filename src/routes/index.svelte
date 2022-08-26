<script context="module" lang="ts">
	import Price from '$lib/components/Price.svelte';
	import { nfts } from '$lib/stores';
</script>

<div class="flex flex-col w-full p-10">
	<h2 class="text-4xl font-extrabold pb-10">Explore the best NFTs</h2>
	<div class="grid grid-cols-4 gap-2 pb-10">
		<div class="span-1">
			<p>String Technologies. The world's first and largest NFT marketplace</p>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-2 pb-10">
		<div class="span-1">
			<input
				type="text"
				placeholder="Search by name"
				class="input input-bordered rounded-none w-full max-w-xs"
			/>
		</div>
		<div class="span-1 grid grid-cols-2 gap-1">
			<select class="select select-bordered rounded-none w-full max-w-xs span-1">
				<option disabled selected>Price Range</option>
				<option>High to Low</option>
				<option>Low to High</option>
			</select>
		</div>
	</div>

	<div class="grid gap-3 grid-cols-4 row-auto-flow">
		{#each nfts as item}
			<div class="card bg-base-100 shadow-xl">
				<figure><img class="item" src={item.imageSrc} alt={item.imageAlt} /></figure>
				<div class="card-body">
					<p class="text-sm font-medium text-primary">{item.collection}</p>
					<h2 class="card-title">
						<a href={`nfts/${item.id}`}>
							<span aria-hidden="true" class="absolute inset-0" />
							{item.name}
						</a>
					</h2>
					<p class="text-sm font-medium text-gray-900 mt-4">
						<Price {item} />
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.item {
		max-width: 200px;
		max-height: 200px;
	}

</style>