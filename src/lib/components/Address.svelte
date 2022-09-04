<script lang="ts">
	import { currentAccount, abbrev } from '$lib/stores';
	
	$: address = $currentAccount || "";
</script>

<div id="addr">
	<h2 class="text-md flex justify-between mt-5">
		<span>Send to</span>
		<span>{abbrev(address)}</span>
	</h2>
</div>
