<script lang="ts">
	export let gistUrl = '';

	import { onMount } from 'svelte';

	let frame: any;
	onMount(() => {
		frame.srcdoc = `<script src='${gistUrl}.js'><${''}/script>`;
	});
</script>

<iframe src="about:blank" bind:this={frame} title="Gist"></iframe>

<style>
	iframe {
		border: 0;
		width: 100%;
		height: auto;
	}
</style>
