<script lang="ts">
	let second = 10;
	setInterval(() => {
		if (second <= 1) {
			second = 10;
			return;
		}
		
		second -= 1;
	}, 1000);
</script>

<span class="text-xs">{second}s</span>