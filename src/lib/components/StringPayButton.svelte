<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from '$lib/stores';
	import { connected } from 'svelte-ethers-store';

	import type { StringPay, StringPayload } from '@stringpay/sdk';

	export let payload: StringPayload;

	let StringPay: StringPay;

	onMount(() => {
		StringPay = window.StringPay;
	});

	const init = (payload: StringPayload) => {
		if (!$connected) $toast.show('Please connect your wallet');
		StringPay?.loadFrame(payload);
	};
</script>

<button
	class="btn btn-primary rounded border-2 tracking-wider text-white h-11"
	on:click={() => init(payload)}
>
	Buy with Card
</button>
