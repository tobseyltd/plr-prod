<script lang="ts">
	import { toastSettings } from '$lib/toast-settings';
	import { ThumbsUp, ThumbsDown } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import Comment from './Comment.svelte';

	export let data: any;

	let { supabase, lesson } = data;
	$: ({ lesson } = data);

	const initialCommentCount = 2;
	let moreButtonDisabled = false;
	let showComments = initialCommentCount;

	$: sortedComments = lesson.comments.toSorted((a: any, b: any) => {
		const dateA: any = parseDate(a.created);
		const dateB: any = parseDate(b.created);

		return dateB - dateA;
	});

	function parseDate(dateString: any) {
		const [day, month, year] = dateString.split('.');
		return new Date(year, month - 1, day);
	}

	function handleShowMoreClick() {
		showComments += 3;
		if (showComments > sortedComments.length) {
			moreButtonDisabled = true;
		}
	}

	function handleShowLessClick() {
		showComments -= 3;
		if (showComments < initialCommentCount) {
			showComments = initialCommentCount;
		}
	}
</script>

<comments-wrapper>
	{#if sortedComments.length !== 0}
		{#each sortedComments.slice(0, showComments) as comment}
			<Comment {comment} {data} />
		{/each}
	{/if}

	{#if lesson.comments.length > initialCommentCount}
		<button-box>
			{#if showComments > initialCommentCount}
				<button class="less" on:click={handleShowLessClick}>-</button>
			{/if}

			<button on:click={handleShowMoreClick}>Zeige weitere Kommentare</button>

			{#if showComments > initialCommentCount}
				<button disabled={moreButtonDisabled} class="more" on:click={handleShowMoreClick}>+</button>
			{/if}
		</button-box>
	{/if}
</comments-wrapper>

<style>
	comments-wrapper {
		display: block;

		& button-box {
			display: flex;
			justify-content: center;
			gap: 0.5rem;

			& button {
				align-self: center;
				background-color: transparent;
				border: none;
			}

			& .less,
			.more {
				border: var(--mainBorder);
				padding: 0 0.5rem;
			}
		}
	}
</style>
