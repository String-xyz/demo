<script lang="ts">
	let value = 100;
	setInterval(() => {
		if (value <= 0) {
			value = 100;
			return;
		}
		value -= .1;
	}, 10);

</script>

<progress class="progress progress-primary w-56 block mt-3 mb-4" {value} max="100"></progress>
