<script lang="ts">
	export let txID: string = '';
	export let txSuccess: boolean;
</script>

{#if txSuccess}
	<a href="https://testnet.snowtrace.io/tx/{txID}">View Transaction</a>
{:else}
	<h2>There was an issue with your transaction, please try again</h2>
{/if}
