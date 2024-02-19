<script lang="ts">
	import { toastSettings } from '$lib/toast-settings';
	import LoadingSpinner from '$lib/utils/LoadingSpinner.svelte';
	import toast from 'svelte-french-toast';

	export let data: any;

	let { session, supabase, lesson } = data;

	let inputValue: string | null;
	let loading = false;

	async function handleNewComment() {
		loading = true;
		const newComment = {
			user_id: session.user.id,
			full_name: session.user.user_metadata.full_name,
			likes: 0,
			dislikes: 0,
			comment: inputValue,
			created: new Date().toLocaleDateString('de-DE', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})
		};

		const newCommentsArray = [newComment, ...lesson.comments];

		const { error: newCommentError } = await supabase
			.from('lessons')
			.update({ comments: newCommentsArray })
			.eq('id', lesson.id)
			.select();

		if (newCommentError) toast.error(newCommentError.message, toastSettings);

		toast.success('Kommentar hinzugefügt', toastSettings);
		inputValue = null;
		loading = false;
	}
</script>

<newcomment-wrapper>
	{#if session}
		<newcomment-box>
			<!-- 	<top-bar>
            {user.user.user_metadata.full_name}
		</top-bar> -->
			<textarea
				bind:value={inputValue}
				name=""
				id=""
				cols="30"
				rows="5"
				placeholder="Was gibts zu sagen?"
			></textarea>
		</newcomment-box>
		<button on:click={handleNewComment} disabled={!inputValue}>
			<span>Kommentieren</span> <LoadingSpinner {loading} /></button
		>
	{:else}
		<p>Nur registrierte Nutzer können kommentieren</p>
	{/if}
</newcomment-wrapper>

<style>
	newcomment-wrapper {
		display: block;
		& newcomment-box {
			display: flex;
			flex-direction: column;
			background-color: var(--bgContainer);
			border-radius: 10px;
			padding-top: 20px;

			& textarea {
				background-color: transparent;
				border: none;
				padding-inline: 20px;
				color: white;

				&:focus-visible {
					outline: none;
				}
			}
		}
		& button {
			margin-top: 1rem;
			width: 100%;

			&:disabled {
				background-color: var(--bgContainer);
			}

			& span {
				margin-right: 0.5rem;
			}
		}
	}
</style>
