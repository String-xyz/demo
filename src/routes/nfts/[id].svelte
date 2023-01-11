<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ params }) => {
		const id = params.id;
		return { props: { id } };
	};
</script>

<script lang="ts">
	import { byId, currentAccount, connect } from '$lib/stores';
	import Price from '$lib/components/Price.svelte';
	import StringPayButton from '$lib/components/StringPayButton.svelte';

	import type { StringPay, StringPayload } from '@stringpay/sdk-dev'

	export let id: string;
	$: item = byId(Number(id));
	
	let payload: StringPayload;
	let StringPay: StringPay = (<any>window).StringPay;
	
	connect();

	const STRING_API_KEY: string = import.meta.env.VITE_STRING_API_KEY ?? "No API Key in ENV";

	$: {
		const currentItem = item;
		if (currentItem) {
			payload = {
				apiKey: STRING_API_KEY,
				name: currentItem.name,
				collection: currentItem.collection,
				currency: currentItem.currency,
				price: currentItem.price,
				imageSrc: currentItem.imageSrc,
				chainID: currentItem.chainID,
				userAddress: $currentAccount,
				contractAddress: currentItem.address,
				contractFunction: "mintTo(address)",
				contractReturn: "uint256",
				contractParameters: [$currentAccount],
				txValue: "0.08 eth"
			}

		}
	}

	// TODO: Have button warn user they aren't connected when trying to click
	// const checkWallet = () => {
	// 	showWalletWarning = !$currentAccount
	// }

	// $: showWalletWarning = !$currentAccount;

	$: isLoaded = false;

	StringPay.onframeload = () => { 
		isLoaded = true
	}

	StringPay.onframeclose = () => {
		isLoaded = false
	}

</script>

<svelte:head>
	<title>String Demo | {item?.name}</title>
</svelte:head>

<div class="backdrop" class:hide='{!isLoaded}' on:click|stopPropagation>
	<div class="string-pay-frame flex justify-center w-full" />
</div>

{#if item}
	<div class="container flex m-auto mt-4 main">
		<img class="showcase" src={item.imageSrc} alt={item.imageAlt}>
		<div class="mt-4">
			<p class="text-primary text-lg font-bold">{item.collection}</p>
			<p class="text-black text-3xl font-bold mb-4">{item.name}</p>
			<p class="mb-4">{item.description}</p>
			<p class="text-bold text-xl mb-4"><Price {item}/></p>

			{#if payload}
				<StringPayButton {payload} />
			{/if}
		</div>
		
		<!-- TODO: Have button warn user they aren't connected when trying to click -->
		<!-- {#if showWalletWarning}
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<p>Please connect with your wallet</p>
					<button on:click={() => showWalletWarning = false}>Close</button>
				</div>
			</div>
		{/if} -->
	</div>
{/if}


<style>
	.hide {
		display: none !important;
	}
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
			justify-content: center
		}
		.showcase {
			margin: auto;
		}
	}

</style>