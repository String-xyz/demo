<script lang="ts">
	import { ModalManager } from '$lib/stores';

	export let title: string;

	const close = () => {
		ModalManager.set(null);
	};
</script>

<div class="backdrop">
	<div id="modal">
		<header class="flex justify-between mt-7">
			<span class="title">{title}</span>
			<button on:click={close}><img src="/images/closebtn.svg" alt="Close" /></button>
		</header>
		<div class="content">
			<slot />
		</div>
		<footer class="footer footer-center mb-6 mt-4 select-none text-xs">
			<div>
				<p>Powered by String</p>
			</div>
		</footer>
	</div>
</div>

<style>
	:global(.divider:before),
	:global(.divider:after) {
		height: 1px !important;
	}
	.title {
		font-size: 24px;
		line-height: 26px;
	}
	.backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, 0.8);
	}
	#modal {
		padding-left: 24px;
		padding-right: 24px;
		border-radius: 10px;
		max-width: 374px;
		overflow: hidden;
		margin: 5% auto;
		background: white;
		user-select: none;
	}
</style>
