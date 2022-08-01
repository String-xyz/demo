<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { NFT } from '$lib/stores/modules/nfts';
	import type { Quote } from '$lib/stores/modules/payment';
	import { getQuote, transact } from '$lib/stores/modules/payment';
	import CompletedTransaction from './CompletedTransaction.svelte';

	export let item: NFT;

	const ckoPK = import.meta.env.VITE_CKO_PK;

	let isPaymentInfoValid = false;
	let checkout: any;
	let billingDetails = {
		name: '',
		billingAddress: {
			addressLine1: '',
			addressLine2: '',
			zip: '',
			city: '',
			state: '',
			country: ''
		},
		phone: ''
	};

	let txID: string;
	let txSuccess: boolean;
	let priceInterval: any;
	let quote: Quote;

	onMount(async () => {
		if (!ckoPK) return;
		checkout = window.Frames;
		checkout.init({
			publicKey: ckoPK,
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
		isPaymentInfoValid = checkout.isCardValid();
		// If we wanted to validate any other information we do it here
	};

	const onCardTokenized = (data: any) => {
		let result: any;
		transact(item, data.token, quote)
			.then((tx) => {
				result = tx;
			})
			.catch((e) => {
				console.error(e);
			});

		txSuccess = result?.success ?? false;
		txID = result?.data ?? '#';
	};

	const doCardTransaction = () => {
		clearInterval(priceInterval);

		// checkout.cardholder = billingDetails;
		checkout.submitCard();
	};
</script>

{#if !txID}
	<div class="main">
		<h1>Buying {item?.name}</h1>
		{#if quote?.data}
			<h4>Base Price: ${quote?.data?.estimate.baseUSD.toFixed(3)}</h4>
			<h4>Gas Fee: ${quote?.data?.estimate.gasUSD.toFixed(3)}</h4>
			<h4>Service Fee: ${quote?.data?.estimate.serviceUSD.toFixed(3)}</h4>
			<h1 id="total">Total Price: ${quote?.data?.estimate.totalUSD.toFixed(3)}</h1>
		{:else}
			<h1>Waiting for Quote</h1>
		{/if}
		<form id="billingForm" on:submit|preventDefault={doCardTransaction}>
			<div class="card-frame" />

			<!-- <label for="name">Name on Card:</label>
			<input type="text" id="name" placeholder='name' bind:value={billingDetails.name}>
			<label for="addressLine1">Address:</label>
			<input type="text" id="addressLine1" bind:value={billingDetails.billingAddress.addressLine1} required>
			<label for="zip">Zip Code:</label>
			<input type="text" id="zip" bind:value={billingDetails.billingAddress.zip} required>
			<label for="city">City:</label>
			<input type="text" id="city" bind:value={billingDetails.billingAddress.city} required>
			<label for="state">State:</label>
			<input type="text" id="state" bind:value={billingDetails.billingAddress.state} required>
			<label for="phone">Phone:</label>
			<input type="tel" id="phone" autocomplete="tel" bind:value={billingDetails.phone} required> -->

			<button id="submit" disabled={!isPaymentInfoValid}>Purchase</button>
		</form>
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

	#total {
		font-weight: bold;
		font-size: 16px;
	}

	h1 {
		font-weight: 500;
	}

	/* label {
		font-weight: 500;
	}

	input {
		border-bottom: 1px solid black;
		margin: 0 auto;
	}

	label, input {
		display: block;
	} */

	.card-frame {
		border: 1px solid black;
		height: 50px;
	}
</style>
