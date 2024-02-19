<script lang="ts">
	import { toastSettings } from '$lib/toast-settings';
	import Tooltip from '$lib/utils/Tooltip.svelte';
	import { ThumbsUp, ThumbsDown, MessageCircleQuestion } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let data: any;
	let { supabase, lesson } = data;

	let liked: boolean = false;
	let disliked: boolean = false;

	const initialCommentCount = 2;
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

	const channels = supabase
		.channel('custom-update-channel')
		.on(
			'postgres_changes',
			{ event: 'UPDATE', schema: 'public', table: 'lessons' },
			(payload: any) => {
				lesson.comments = payload.new.comments;
			}
		)
		.subscribe();

	async function handleLikeClick(index: number) {
		liked = !liked;

		if (liked) {
			const updatedComments = lesson.comments!.map((comment: { likes: number }, i: number) => {
				i === index ? comment.likes++ : comment;
				return comment;
			});

			const { error } = await supabase
				.from('lessons')
				.update({ comments: updatedComments })
				.eq('id', lesson.id)
				.select();

			if (error) toast.error(error.message, toastSettings);
		} else {
			const updatedComments = lesson.comments!.map((comment: { likes: number }, i: number) => {
				i === index ? comment.likes-- : comment;
				return comment;
			});

			const { error } = await supabase
				.from('lessons')
				.update({ comments: updatedComments })
				.eq('id', lesson.id)
				.select();

			if (error) toast.error(error.message, toastSettings);
		}
	}

	async function handleDisLikeClick(index: number) {
		disliked = !disliked;

		if (disliked) {
			const updatedComments = lesson.comments!.map((comment: { dislikes: number }, i: number) => {
				i === index ? comment.dislikes++ : comment;
				return comment;
			});

			const { error } = await supabase
				.from('lessons')
				.update({ comments: updatedComments })
				.eq('id', lesson.id)
				.select();

			if (error) toast.error(error.message, toastSettings);
		} else {
			const updatedComments = lesson.comments!.map((comment: { dislikes: number }, i: number) => {
				i === index ? comment.dislikes-- : comment;
				return comment;
			});

			const { error } = await supabase
				.from('lessons')
				.update({ comments: updatedComments })
				.eq('id', lesson.id)
				.select();

			if (error) toast.error(error.message, toastSettings);
		}
	}

	function handleShowMoreClick() {
		showComments += 3;
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
		{#each sortedComments.slice(0, showComments) as comment, index}
			<comment-box>
				<top-bar>
					<b>{comment.full_name}</b> <span>am {comment.created}</span>
				</top-bar>
				<user-comment>
					{comment.comment}
				</user-comment>
				<like-bar>
					<likes-box
						tabindex="0"
						role="button"
						on:keydown={() => handleLikeClick(index)}
						on:click={() => handleLikeClick(index)}
					>
						<ThumbsUp size={20} strokeWidth={1.5} class="icon" />
						<span>( {comment.likes} )</span>
					</likes-box>
					<dislike-box
						tabindex="0"
						role="button"
						on:keydown={() => handleDisLikeClick(index)}
						on:click={() => handleDisLikeClick(index)}
					>
						<ThumbsDown size={20} strokeWidth={1.5} />
						<span>( {comment.dislikes} )</span>
					</dislike-box>
				</like-bar>
			</comment-box>
		{/each}

	{/if}

	{#if lesson.comments.length > initialCommentCount}
		<button-box>
			{#if showComments > initialCommentCount}
				<button class="less" on:click={handleShowLessClick}>-</button>
			{/if}

			<button on:click={handleShowMoreClick}>Zeige weitere Kommentare</button>

			{#if showComments > initialCommentCount}
				<button class="more" on:click={handleShowMoreClick}>+</button>
			{/if}
		</button-box>
	{/if}
</comments-wrapper>

<style>
	comments-wrapper {
		display: block;
		margin-top: 2rem;

		& h2 span {
			font-size: 1rem;
			font-weight: 600;
		}

		& comment-box {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;
			margin: 1rem 0;
			background-color: var(--bgContainer);
			padding: 1rem;
			border-radius: 10px;
			border-bottom: 4px solid #2d39db57;

			& top-bar {
				display: flex;
				justify-content: space-between;
				width: 100%;
				& span {
					font-size: 0.7rem;
				}
			}

			& user-comment {
				display: flex;
				width: 100%;
				justify-content: start;
				padding: 0.5rem 0;
				font-size: 0.9rem;
			}

			& like-bar {
				display: flex;
				gap: 0.7rem;
				/* border-top: 1px solid gray; */

				& likes-box,
				dislike-box {
					/* background-color: var(--bgContainer); */
					padding: 0.2rem 0rem;
					border-radius: 10px;
					display: flex;
					align-items: center;
					gap: 0.3rem;
					font-size: 0.8rem;
					cursor: pointer;

					& span {
						padding-top: 0.13rem;
					}
				}
			}
		}
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
