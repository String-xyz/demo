<div class="spinner" />

<style>
	.spinner {
		border: 4px solid #f3f3f3;
		border-radius: 50%;
		border-top: 4px solid #006AB7;
		width: 60px;
		height: 60px;
		margin: auto;
		margin-top: 10px;
		margin-bottom: 10px;
		-webkit-animation: spin 2s linear infinite; /* Safari */
		animation: spin 2s linear infinite;
	}

	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
