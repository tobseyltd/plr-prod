<script lang="ts">
	import { toastSettings } from '$lib/toast-settings';
	import { ThumbsUp, ThumbsDown } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let data: any;
	export let comment: any;
	const { supabase, lesson } = data;

	let liked: boolean = false;
	let disliked: boolean = false;

	async function handleLikeClick(id: string) {
		liked = !liked;

		if (liked) {
			const updatedComments = lesson.comments!.map((comment: any) => {
				id === comment.id ? comment.likes++ : comment;
				return comment;
			});

			lesson.comments = updatedComments;

			const { error } = await supabase
				.from('lessons')
				.update({ comments: updatedComments })
				.eq('id', lesson.id)
				.select();

			if (error) toast.error(error.message, toastSettings);
		} else {
			const updatedComments = lesson.comments!.map((comment: any) => {
				id === comment.id ? comment.likes-- : comment;
				return comment;
			});

			lesson.comments = updatedComments;

			const { error } = await supabase
				.from('lessons')
				.update({ comments: updatedComments })
				.eq('id', lesson.id)
				.select();

			if (error) toast.error(error.message, toastSettings);
		}
	}

	async function handleDisLikeClick(id: string) {
		disliked = !disliked;

		if (disliked) {
			const updatedComments = lesson.comments!.map((comment: any) => {
				id === comment.id ? comment.dislikes++ : comment;
				return comment;
			});

			lesson.comments = updatedComments;

			const { error } = await supabase
				.from('lessons')
				.update({ comments: updatedComments })
				.eq('id', lesson.id)
				.select();

			if (error) toast.error(error.message, toastSettings);
		} else {
			const updatedComments = lesson.comments!.map((comment: any) => {
				id === comment.id ? comment.dislikes-- : comment;
				return comment;
			});

			lesson.comments = updatedComments;

			const { error } = await supabase
				.from('lessons')
				.update({ comments: updatedComments })
				.eq('id', lesson.id)
				.select();

			if (error) toast.error(error.message, toastSettings);
		}
	}
</script>

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
			on:keydown={() => handleLikeClick(comment.id)}
			on:click={() => handleLikeClick(comment.id)}
		>
			<ThumbsUp size={20} strokeWidth={1.5} class="icon" />
			<span>( {comment.likes} )</span>
		</likes-box>
		<dislike-box
			tabindex="0"
			role="button"
			on:keydown={() => handleDisLikeClick(comment.id)}
			on:click={() => handleDisLikeClick(comment.id)}
		>
			<ThumbsDown size={20} strokeWidth={1.5} />
			<span>( {comment.dislikes} )</span>
		</dislike-box>
	</like-bar>
</comment-box>

<style>
	comment-box {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		margin-bottom: 1rem;
		background-color: var(--bgContainer);
		padding: .7rem 1rem;
		border-radius: 10px;
		border-bottom: 4px solid var(--blueAccent);

		& top-bar {
			display: flex;
			justify-content: space-between;
			width: 100%;

			& span {
				font-size: 0.7rem;
			}

			& b {
				font-size: 0.9rem;
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
</style>
