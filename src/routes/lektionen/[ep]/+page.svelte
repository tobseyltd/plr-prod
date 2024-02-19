<script lang="ts">
	import { writable } from 'svelte/store';
	import LoginForm from '../../login/LoginForm.svelte';
	import type { PageData } from './$types';
	import Gist from '$lib/utils/Gist.svelte';
	import { goto } from '$app/navigation';
	import { ThumbsUp, MessageCircle, Paperclip } from 'lucide-svelte';
	import Comments from './Comments.svelte';
	import AddComment from './AddComment.svelte';
	import Accordion from '$lib/utils/Accordion.svelte';
	import toast from 'svelte-french-toast';
	import { toastSettings } from '$lib/toast-settings';

	export let data: PageData;

	let showMemberContent = writable<boolean>(false);
	let memberContentUnsubscribed = writable<boolean>(false);
	let liked: boolean = false;

	$: {
		if (data.session) {
			showMemberContent.set(data.tier === 'ABO' || data.paymentStatus === 'paid');
			memberContentUnsubscribed.set(data.tier === 'Keine' || data.paymentStatus === undefined);
		}
	}

	const channels = data.supabase
		.channel('custom-update-channel')
		.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'lessons' }, (payload) => {
			data.lesson.likes = payload.new.likes;
		})
		.subscribe();

	async function handleLikeClick() {
		liked = !liked;

		if (liked) {
			const { error: likeError } = await data.supabase
				.from('lessons')
				.update({ likes: data.lesson.likes! + 1 })
				.eq('id', data.lesson.id)
				.select();

			if (likeError) toast.error(likeError.message, toastSettings);
		} else {
			const { error: dislikeError } = await data.supabase
				.from('lessons')
				.update({ likes: data.lesson.likes! - 1 })
				.eq('id', data.lesson.id)
				.select();

			if (dislikeError) toast.error(dislikeError.message, toastSettings);
		}
	}
</script>

<detail-page-wrapper>
	<status-bar>
		<button on:click={() => goto('/lektionen')}>Zurück</button>
		<social-box>
			<likes-box tabindex="0" role="button" on:keydown={handleLikeClick} on:click={handleLikeClick}>
				<ThumbsUp size={20} strokeWidth={1.5} class="icon" />
				<span>( {data.lesson.likes} )</span>
			</likes-box>
			<a href="#kommentare">
				<comment-box>
					<MessageCircle size={20} strokeWidth={1.5} class="icon" />
					<span>( {data.lesson.comments?.length} )</span>
				</comment-box>
			</a>
		</social-box>
	</status-bar>

	<h1>{data.lesson.ep?.toUpperCase()} : {data.lesson.title}</h1>
	<detail-page-content>
		<left-side>
			<p>{data.lesson.description}</p>
			<h3>Part 1 - Free Coding Lektion</h3>

			<video-wrapper>
				{@html data.lesson.video1}
			</video-wrapper>
			<h3>Part 2 - Members Coding Lektion</h3>

			{#if $showMemberContent}
				{#if data.lesson.video2}
					<video-wrapper>
						{@html data.lesson.video2}
					</video-wrapper>
					<video-content>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui repellat, quis nisi
							libero adipisci molestias porro mollitia consectetur omnis praesentium ad velit minus
							harum itaque magni. Dignissimos, autem pariatur.
						</p>
						<blockquote>stripe listen --forward-to localhost:5173/api/stripe/webhook</blockquote>
						<Gist gistUrl="https://gist.github.com/tobseyltd/2716b7cd45db9fc050c81a0bb3bc1015" />
					</video-content>
				{/if}

				{#if data.lesson.video3}
					<h3>Part 3 - Members Coding Lektion</h3>
					<video-wrapper>
						{@html data.lesson.video3}
					</video-wrapper>
					<video-content>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui repellat, quis nisi
							libero adipisci molestias porro mollitia consectetur omnis praesentium ad velit minus
							harum itaque magni. Dignissimos, autem pariatur.
						</p>
						<blockquote>stripe listen --forward-to localhost:5173/api/stripe/webhook</blockquote>
						<Gist gistUrl="https://gist.github.com/tobseyltd/2716b7cd45db9fc050c81a0bb3bc1015" />
					</video-content>
				{/if}
				<!-- <AddComment {data} />
				<Comments {data} /> -->
			{/if}
		</left-side>

		<right-side>
			<h2>Dateien</h2>
			<ul>
				<li>
					<a
						href="/files/Handbuch_Frontend_Entwickler_2_of_4_v2.pdf"
						target="_blank"
						rel="noopener noreferrer"><Paperclip strokeWidth={1.5} /> Handbuch</a
					>
				</li>
				<li>
					<a href="/files/monaspace-v1.000.zip" target="_blank" rel="noopener noreferrer"
						><Paperclip strokeWidth={1.5} /> <span>Schriftart</span></a
					>
				</li>
			</ul>
			<Accordion>
				<h3 slot="head">Kommentar verfassen</h3>
				<AddComment slot="details" {data} />
			</Accordion>
			<Accordion>
				<h2 slot="head" id="kommentare">
					Kommentare <span>( {data.lesson.comments?.length} )</span>
				</h2>
				<Comments slot="details" {data} />
			</Accordion>
		</right-side>
	</detail-page-content>

	{#if $memberContentUnsubscribed}
		<no-abo-logged
			>Du hast kein aktives ABO. <a href="/mitglied-werden"><b>Jetzt kaufen!</b></a></no-abo-logged
		>
	{:else if !$showMemberContent}
		<login-form>
			<p>Einloggen oder <a href="/mitglied-werden">Mitglied werden</a></p>
			<LoginForm
				data={data.loginForm}
				supabase={data.supabase}
				height="30vh"
				showHeader={false}
				borderTop="none"
			/>
		</login-form>
	{/if}
</detail-page-wrapper>

<style>
	detail-page-wrapper {
		display: block;
		margin: 0 auto;
		padding: 0.5rem 0;
		min-height: 80vh;
		overflow: hidden;

		& p:not(video-content p) {
			border-bottom: 1px solid #2d39db57;
			padding-bottom: 1rem;
			color: var(--textAccent);
		}

		& status-bar {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #2d39db57;
			margin-bottom: 1.5rem;
			padding-bottom: 1rem;

			& button {
				width: 100px;
				background-color: transparent;
				padding: 0;

				&:hover {
					border-color: var(--tertColor);
				}
			}

			& social-box {
				display: flex;
				gap: 1rem;

				& a {
					text-decoration: none;
					color: white;
				}

				& likes-box,
				comment-box {
					background-color: var(--bgContainer);
					padding: 0.2rem 0.7rem;
					border-radius: 10px;
					display: flex;
					align-items: center;
					gap: 0.4rem;
					font-size: 0.8rem;
					cursor: pointer;
					border-bottom: 2px solid #2d39db57;

					&:hover {
						border-color: var(--tertColor);
					}

					& span {
						padding-top: 0.13rem;
					}
				}
			}
		}

		& detail-page-content {
			margin-top: 1rem;
			margin-bottom: 2rem;
			display: flex;

			@media (width < 769px) {
				flex-wrap: wrap;
			}

			& left-side {
				width: 60%;
				position: relative;
				margin-right: 50px;
				margin-bottom: 2rem;

				@media (width < 769px) {
					width: 100%;
					margin: 0;
				}

				& video-wrapper {
					display: block;
					position: relative;
					padding-bottom: 56.25%;
					margin: 20px 0;

					& iframe {
						border-radius: 1rem;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
				}

				& video-content {
					border-bottom: 1px solid #2d39db57;

					& p {
						padding: 1.5rem 2rem;

						@media (width < 451px) {
							padding: 0.7rem 0.5rem;
							text-align: justify;
						}
					}

					& blockquote {
						margin: 1.5rem 0.4rem;
						padding: 1rem 3rem;
						background-color: var(--bgContainer);
						color: white;
						border-radius: 10px;
						white-space: pre-wrap;
						width: auto;

						@media (width < 451px) {
							padding: 0.7rem 1rem;
						}
					}
				}

				& h3 {
					padding-top: 2rem;
				}
			}

			& right-side {
				width: 40%;
				padding-left: 80px;

				@media (width < 769px) {
					width: 100%;
					margin: 2rem 0;
					/* display: none; */
				}

				& ul {
					margin-top: 1rem;

					& li {
						padding: 0.2rem 0;

						& a {
							text-decoration: none;
							color: var(--textAccent);
							display: flex;
							align-items: center;
							gap: 0.2rem;

							&:hover {
								color: var(--tertColor);
							}
						}
					}
				}
			}
		}

		& login-form {
			float: left;
			margin-top: -1rem;
			margin-bottom: 1rem;

			& p {
				margin: 1rem 0;

				& a {
					color: var(--secondColor);
				}
			}
		}

		& p a {
			color: var(--secondColor);
		}

		& no-abo-logged {
			position: absolute;
			margin-top: -3rem;

			@media (width < 769px) {
				margin-top: -1.8rem;
			}
		}
	}
</style>
