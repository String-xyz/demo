<script lang="ts">
	import { onMount } from 'svelte';
  import { process } from '$lib/stores/modules/payment';
  const ckoPK = import.meta.env.VITE_CKO_PK;
  let checkout;

	onMount(() => {
		checkout = window.Frames;
		checkout.init(
            {
            publicKey:ckoPK,
            cardTokenized: onCardTokenized,
        });
	});
  
  const handlePayment = () => {
        if (checkout.isCardValid()) { 
            checkout.submitCard()
        }
    };
    const onCardTokenized = (data:any) => { 
        process(data.token)
  }

</script>

<svelte:head>
	<script src="https://cdn.checkout.com/js/framesv2.min.js"></script>
</svelte:head>

<div class="flex justify-center items-center min-h-screen dark:bg-gray-800">
	<div class="h-auto w-80 bg-white p-3 rounded-lg">
        <div class="p-6 max-w-sm bg-white rounded-lg card-frame">
        </div>
		<button class="outline-none h-12 bg-orange-600 text-white mb-2 hover:bg-orange-700 rounded-lg w-1/2 cursor-pointer"
			on:click={handlePayment}>Pay</button>
	</div>
</div>
