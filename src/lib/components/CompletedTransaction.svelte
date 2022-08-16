<script lang="ts">
	export let txID: string = '';
	export let txSuccess: boolean;
</script>

{#if txSuccess}
	<h1>Thank you for your purchase</h1>
	<p class="mt-3 underline">
		<a href="https://testnet.snowtrace.io/tx/{txID}" target="_blank" rel="noreferrer noopener"
			>View Transaction</a
		>
	</p>
	<p class="mt-3 underline"><a href="/">Continue Shopping</a></p>
{:else}
	<h2>There was an issue with your transaction, please try again</h2>
{/if}
