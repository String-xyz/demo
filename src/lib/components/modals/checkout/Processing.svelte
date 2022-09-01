<script lang="ts">
	import ModalBase from './ModalBase.svelte';
	import {
		card,
		finalQuote,
		transact,
		ModalManager,
		ModalProps,
		type Card,
		type NFT
	} from '$lib/stores';
	import { onMount } from 'svelte';

	import NFTDetails from '$lib/components/NFTDetails.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import PurchaseSuccess from './PurchaseSuccess.svelte';
	import PurchaseFail from './PurchaseFail.svelte';

	export let item: NFT;

	onMount(async () => {
		let result: any;
		await transact(item, $card.token, $finalQuote)
			.then((tx) => {
				result = tx;
			})
			.catch((e) => {
				console.error(e);
			});

		const txSuccess = result?.success ?? false;
		const txID = result?.data?.txID ?? '#';

		if (txSuccess)
			ModalProps.update((props) => {
				return { ...props, txID };
			});
		card.set(<Card>{});
		ModalManager.set(txSuccess ? PurchaseSuccess : PurchaseFail);
	});
</script>

<ModalBase title="Processing">
	<NFTDetails {item} />
	<div class="mt-9"></div>
	<Spinner />
	<div class="mt-6 text-center">
		<p>We are purchasing this item. This procedure may take some time.</p>
		<p class="mt-2">You will not be charged until the blockchain transaction is completed</p>
	</div>
</ModalBase>
