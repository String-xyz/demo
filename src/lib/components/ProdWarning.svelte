<script lang="ts">
	import { prodWarningModalOpen }	from '$lib/stores';

	const close = () => {
		$prodWarningModalOpen = false;
	}

	const handleKeyboard = (e: KeyboardEvent) => {
		if ($prodWarningModalOpen) {
			if (e.key == "Enter" || e.key == "Escape") {
				close();
			}
		}
	};

</script>

<svelte:window on:keydown={(e) => handleKeyboard(e)} />

<input type="checkbox" id="prod-warning-modal" class="modal-toggle" bind:checked={$prodWarningModalOpen} />

<div class="modal" on:scroll|stopPropagation>
	<div class="modal-box relative">
		<div class="main flex flex-col items-center select-none w-full">
			<button class="ml-auto mb-4" on:click={close}><img src="/assets/close.svg" alt="Close" /></button>
			<img src="/assets/warning.svg" alt="warning" class="mb-2" />
			<h1 class="font-semibold text-2xl text-neutral mb-6">Going to production mode</h1>
			<p class="text-center">You are about to switch to testing our <span class="font-medium">real money environment</span>. This environment only accepts real card details. Please contact support to receive a refund as this is just meant for testing.</p>
			<p class="text-center">If you accept the risks, you can exit this screen by pressing Esc, or clicking the exit buttons. Otherwise, please exit and switch the toggle back to Sandbox mode.</p>

			<button on:click|preventDefault={close} class="btn-primary btn-wide h-11 rounded mt-6 p-1 text-sm text-white font-bold tracking-wider uppercase">
				Exit
			</button>
		</div>
	</div>
</div>

<style>
	.modal {
		background: rgba(252, 252, 252, 0.4);
		backdrop-filter: blur(2px);
	}

	.modal-box {
		padding-left: 36px;
		padding-right: 36px;
		padding-top: 36px;
		border-radius: 8px;
		width: 500px;
		height: 450px;
	}
</style>