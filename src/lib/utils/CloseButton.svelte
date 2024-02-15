<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	export let onClose: MouseEventHandler<HTMLButtonElement>;
</script>

<button on:click={onClose}>Custom Close Button</button>

<style>
	button {
		position: absolute;
		top: -3rem;
		right: 0;
		color: white;
		background: var(--bgContainer);
		border: 2px solid pink;
	}
</style>
