<script lang="ts">
	import { onMount } from 'svelte';
	import { defaultEvmStores, signerAddress } from 'svelte-ethers-store';
	import type { PageData } from './$types';
	import type { StringPay, StringPayload } from '@stringpay/sdk';

	import { getNFTById } from '$lib/services';
	import { stringSdkEnv, stringSdkPublicKey } from '$lib/stores';

	import StringPayButton from '$lib/components/StringPayButton.svelte';
	import Price from '$lib/components/Price.svelte';

	export let data: PageData;

	let item = getNFTById(data.id);

	let StringPay: StringPay;
	let payload: StringPayload;
	let isFrameLoaded = false;

	onMount(() => {
		// Prompt connect wallet
		defaultEvmStores.setProvider();

		// Load StringPay
		StringPay = window.StringPay;

		if (!StringPay) {
			console.error('[String Pay] Cannot find stringpay module in DOM');
		}

		StringPay.init({
			env: $stringSdkEnv,
			publicKey: $stringSdkPublicKey
		});

		stringSdkEnv.subscribe((env) => {
			if (StringPay) {
				StringPay.init({
					env,
					publicKey: $stringSdkPublicKey
				});
			}
		});

		StringPay.onFrameLoad = () => {
			isFrameLoaded = true;
		};

		StringPay.onFrameClose = () => {
			isFrameLoaded = false;
		};
	});

	$: {
		const currentItem = item;
		if (currentItem) {
			payload = {
				assetName: currentItem.assetName,
				collection: currentItem.collection,
				price: currentItem.price,
				currency: currentItem.currency,
				imageSrc: currentItem.imageSrc,
				chainID: currentItem.chainId,
				userAddress: $signerAddress,
				contractAddress: currentItem.address,
				contractFunction: 'mintTo(address)',
				contractReturn: 'uint256',
				contractParameters: [$signerAddress],
				txValue: `${currentItem.price} eth`
			};
		}
	}
</script>

<svelte:head>
	<title>String Demo | {item?.assetName ?? 'NFT'}</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop" class:!hidden={!isFrameLoaded} on:click|stopPropagation>
	<div class="string-pay-frame flex justify-center pt-14 w-full" />
</div>

{#if item}
	<div class="container flex m-auto mt-4 main">
		<img class="showcase" src={item.imageSrc} alt={item.imageAlt} />
		<div class="my-4 info">
			<p class="text-primary text-lg font-bold">{item.collection}</p>
			<p class="text-black text-3xl font-bold mb-4">{item.assetName}</p>
			<p class="mb-4">{item.description}</p>
			<p class="text-bold text-xl mb-4"><Price {item} /></p>

			{#if payload}
				<StringPayButton {payload} />
			{/if}
		</div>
	</div>
{/if}

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.showcase {
		margin-left: 20px;
		margin-right: 128px;
		object-fit: contain;
		width: 400px;
		height: 400px;
	}

	@media (max-width: 500px) {
		.main {
			margin-left: 16px;
			margin-right: 16px;
			width: calc(100% - 32px);
		}
	}

	@media (max-width: 800px) {
		.container {
			flex-flow: wrap;
			align-items: center;
			justify-content: center;
		}

		.showcase {
			margin: auto;
		}

		.info {
			max-width: 400px;
		}
	}

</style>
