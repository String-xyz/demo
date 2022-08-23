<script lang="ts">
	import '../app.css';
	import { connect, disconnect, currentAccount } from '$lib/stores';

	function onConnect() {
		connect();
	}

	function onDisconect() {
		disconnect();
	}
</script>

<div class="mx-auto h-screen">
	<div class="flex flex-col drawer-content">
		<div class="w-full navbar bg-white text-dark-content  border-base-300">
			<div class="flex-1 px-2 mx-2">
				<a class="btn btn-ghost btn-lg rounded-btn text-primary" href="/"> STRING</a>
			</div>

			<div class="flex-none hidden px-2 mx-2 lg:flex">
				<div class="flex items-stretch">
					<a class="btn btn-ghost btn-sm rounded-btn" href="/"> Explore </a>
					<a class="btn btn-ghost btn-sm rounded-btn" href="#"> Stats </a>
					<a class="btn btn-ghost btn-sm rounded-btn" href="#"> Resources </a>
					<a class="btn btn-ghost btn-sm rounded-btn" href="#"> Create </a>
					{#if $currentAccount}
						<button class="btn btn-outline btn-sm rounded-btn btn-secondary" on:click={onDisconect}>
							{$currentAccount.substring(0, 10) + '...'}
						</button>
					{:else}
						<button class="btn btn-outline btn-sm rounded-btn btn-primary" on:click={onConnect}>
							Connect Wallet
						</button>
					{/if}
				</div>
			</div>
		</div>
		<div class="divider" />
		<slot />
	</div>
</div>

<style>
</style>
