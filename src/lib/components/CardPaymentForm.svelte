<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { NFT } from '$lib/stores/modules/nfts';
	import type { Quote } from '$lib/stores/modules/payment';
	import { getQuote, transact } from '$lib/stores/modules/payment';
	import CompletedTransaction from './CompletedTransaction.svelte';

	export let item: NFT;

	const CHECKOUT_PK = import.meta.env.VITE_CHECKOUT_PUBLIC_KEY;

	let isPaymentInfoValid = false;
	let showSpinner = false;
	let checkout: any;
	let billingDetails = {
		name: 'John Smith',
		billingAddress: {
			addressLine1: '1 House Lane',
			addressLine2: '',
			zip: '11111',
			city: 'City',
			state: 'State',
			country: 'US'
		},
		phone: ''
	};

	let txID: string;
	let txSuccess: boolean;
	let priceInterval: any;
	let quote: Quote;
	
	onMount(async () => {
		if (!CHECKOUT_PK) return;
		checkout = window.Frames;
		checkout.init({
			publicKey: CHECKOUT_PK,
			cardTokenized: onCardTokenized,
			cardValidationChanged: validateInfo
		});

		const refreshQuote = async () => {
			try {
				quote = await getQuote(item);
			} catch (e) {
				console.error(e);
			}
		};
		refreshQuote();
		priceInterval = setInterval(refreshQuote, 10000);
	});

	onDestroy(() => clearInterval(priceInterval));

	const validateInfo = () => {
		isPaymentInfoValid = checkout.isCardValid() && quote?.data !== undefined;
		
		// If we wanted to validate any other information we do it here
	};

	const onCardTokenized = async (data: any) => {
		let result: any;
		await transact(item, data.token, quote)
			.then((tx) => {
				result = tx;
			})
			.catch((e) => {
				console.error(e);
			});

		txSuccess = result?.success ?? false;
		txID = result?.data ?? '#';
		showSpinner = false;
	};

	const doCardTransaction = () => {
		clearInterval(priceInterval);
		showSpinner = true;
		checkout.cardholder = billingDetails;
		checkout.submitCard();
	};
</script>

{#if !txID}
	<div class="main">
		<h1 class="text-lg">Buying {item?.name}</h1>
		{#if quote?.data}
			<h4>Base Price: ${quote?.data?.estimate.baseUSD.toFixed(3)}</h4>
			<h4>Gas Fee: ${quote?.data?.estimate.gasUSD.toFixed(3)}</h4>
			<h4>Service Fee: ${quote?.data?.estimate.serviceUSD.toFixed(3)}</h4>
			<h1 class="text-lg font-bold">Total Price: ${quote?.data?.estimate.totalUSD.toFixed(3)}</h1>
		{:else}
			<h1>Waiting for Quote</h1>
		{/if}
		<form id="billingForm" on:submit|preventDefault={doCardTransaction}>
			<div class="card-frame" />
			
			<label for="name">Name on Card:</label>
			<input type="text" id="name" bind:value={billingDetails.name} required>
			<label for="addressLine1">Address:</label>
			<input type="text" id="addressLine1" bind:value={billingDetails.billingAddress.addressLine1}>
			<label for="zip">Zip Code:</label>
			<input type="text" id="zip" bind:value={billingDetails.billingAddress.zip}>
			<label for="city">City:</label>
			<input type="text" id="city" bind:value={billingDetails.billingAddress.city}>
			<label for="state">State:</label>
			<input type="text" id="state" bind:value={billingDetails.billingAddress.state}>
			<button id="submit" disabled={!isPaymentInfoValid}>Purchase</button>
		</form>
		{#if showSpinner}
		<div class="spinner" />
		{/if}
	</div>
{:else}
	<CompletedTransaction {txID} {txSuccess} />
{/if}

<style>
	#submit {
		display: block;
		margin: 0 auto;
		border: 2px solid blue;
		border-radius: 10px;
		padding-inline: 5px;
		margin-top: 10px;
	}

	#submit:disabled {
		border-color: grey;
		color: grey;
	}

	h1 {
		font-weight: 500;
	}

	label {
		font-weight: 500;
	}

	input {
		border-bottom: 1px solid black;
		margin: 0 auto;
	}

	label, input {
		display: block;
	}

	.card-frame {
		border: 1px solid black;
		height: 50px;
	}

	.spinner {
		border: 8px solid #f3f3f3;
		border-radius: 50%;
		border-top: 8px solid #3498db;
		width: 50px;
		height: 50px;
		margin: auto;
		margin-top: 10px;
		-webkit-animation: spin 2s linear infinite; /* Safari */
		animation: spin 2s linear infinite;
	}

	@-webkit-keyframes spin {
		0% { -webkit-transform: rotate(0deg); }
		100% { -webkit-transform: rotate(360deg); }
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>
