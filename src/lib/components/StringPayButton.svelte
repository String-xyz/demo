<script lang='ts'>
	import { onMount } from 'svelte'
	import type { StringPay, StringPayload } from '@stringpay/sdk'

	export let payload: StringPayload;

	let StringPay: StringPay;

	onMount(() => {
		StringPay = (<any>window).StringPay

		if (!StringPay) {
			console.error('[String Pay] Cannot find stringpay module in DOM')
		}
	});

	const init = (payload: StringPayload) => {
		StringPay?.loadFrame(payload);
	}
</script>

<button
class="btn btn-primary rounded border-2 normal-case"
on:click={() => init(payload)}>Mint with Card
</button>