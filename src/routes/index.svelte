<script context="module" lang="ts">
	import { nfts } from '$lib/stores';
</script>

<div class="flex flex-col w-full p-10">
	<h2 class="text-4xl font-extrabold pb-10">Explore the best NFTs</h2>
	<div class="grid grid-cols-4 gap-2 pb-10">
		<div class="span-1">
			<p>String Techologies. the world's first and largest NFT marketplace</p>
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
			<div class="span-1 flex items-center">
				<input type="checkbox" class="checkbox" />
				<span class="label-text m-3"> Buy Now</span>
				<input type="checkbox" class="checkbox" />
				<span class="label-text m-3"> Buy with Card</span>
			</div>
		</div>
	</div>

	<div class="grid gap-3 grid-cols-4 row-auto-flow">
		{#each nfts as product}
			<div class="card bg-base-100 shadow-xl">
				<figure><img src={product.imageSrc} alt={product.imageAlt} /></figure>
				<div class="card-body">
					<h2 class="card-title text-primary">
						<a href={`nfts/${product.id}`}>
							<span aria-hidden="true" class="absolute inset-0" />
							{product.name}
						</a>
					</h2>
					<p class="text-sm font-medium text-gray-900">Collection Name</p>
					<p class="text-sm font-medium text-gray-900">
						{product.price}
						{product.currency || 'AVAX'}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
