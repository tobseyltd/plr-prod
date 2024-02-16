<script lang="ts">
	export let loading: boolean;
</script>

{#if loading}
	<span class="loader"> </span>
{/if}

<style>
	.loader {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		border: 3px solid;
		border-color: #fff #fff transparent transparent;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
		padding-right: 0.4rem;
	}
	.loader::after,
	.loader::before {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border: 3px solid;
		border-color: transparent transparent var(--secondColor) var(--secondColor);
		width: 20px;
		height: 20px;
		border-radius: 50%;
		box-sizing: border-box;
		animation: rotationBack 0.5s linear infinite;
		transform-origin: center center;
	}
	.loader::before {
		width: 22px;
		height: 22px;
		border-color: #fff #fff transparent transparent;
		animation: rotation 1.5s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes rotationBack {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
