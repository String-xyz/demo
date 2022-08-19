<script lang="ts">
	import { currentAccount, connect } from '$lib/stores';

	const abbr = (addr:string) => {
  		return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
	};

	$: address = $currentAccount ?? ""

</script>

<div id="addr">
	<h2 class="text-md flex justify-between mt-5">
		Send to<br>
		<div class="tooltip break-all " data-tip={address}>
			<span class="badge badge-lg">{abbr(address)}</span>
		</div>
	  </h2>
	<!-- <div class="card w-90 bg-base-200">
		<div class="card-body">
			
		  <p class="break-all">{abbr($currentAccount) || "You need to login"}</p>
		</div>
	</div> -->
</div>