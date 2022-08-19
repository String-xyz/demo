<script context="module" lang="ts">
	import { nfts } from '$lib/stores';
</script>

<div class="bg-white">
	<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
		<h2 class="text-2xl font-extrabold tracking-tight text-gray-900">T-shirts NFTs</h2>

		<div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
			{#each nfts as product}
				<div class="group relative">
					<div
						class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
					>
						<img
							src={product.imageSrc}
							alt={product.imageAlt}
							class="w-full h-full object-center object-cover lg:w-full lg:h-full"
						/>
					</div>
					<div class="mt-4 flex justify-between">
						<div>
							<h3 class="text-sm text-gray-700">
								<a href={`nfts/${product.id}`}>
									<span aria-hidden="true" class="absolute inset-0" />
									{product.name}
								</a>
							</h3>
						</div>
						<p class="text-sm font-medium text-gray-900">
							{product.price}
							{product.currency || 'AVAX'}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
