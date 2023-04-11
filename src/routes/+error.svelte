<script>
	import { page } from '$app/stores';
</script>

<div class="error">
	<h1 class="">{$page.status}: {$page.error?.message}</h1>
</div>

<style>
	.error {
		margin-left: 16px;
	}
</style>