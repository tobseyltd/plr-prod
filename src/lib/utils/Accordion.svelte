<script lang="ts">
	import { ChevronUp, ChevronDown } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	export let open = false;

	const handleClick = () => (open = !open);
</script>

<div class="accordion">
	<div class="header">
		<div role="button" tabindex="0" on:keydown={handleClick} on:click={handleClick} class="text">
			<slot name="head" />
		</div>

		<button on:click={handleClick}>
			{#if open}
				<ChevronUp strokeWidth={1.5} />
			{:else}
				<ChevronDown strokeWidth={1.5} />
			{/if}
		</button>
	</div>

	{#if open}
		<div class="details" transition:slide>
			<slot name="details" />
		</div>
	{/if}
</div>

<style>
	div.accordion {
		margin: 0;
	}

	div.header {
		display: flex;
		width: 100%;
	}

	div.header .text {
		flex: 1;
		margin-right: 5px;
	}

	div[role='button'] {
		cursor: pointer;
	}

	button {
		padding: 0;
		background-color: transparent;
		border: none;
	}
</style>
