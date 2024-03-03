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
	import MainLayout from '../../../layouts/MainLayout.svelte';
	import ShareButtons from '$lib/components/ShareButtons/index.svelte';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import type { Page } from '@sveltejs/kit';

	export let data: PageData;

	let showMemberContent = writable<boolean>(false);
	let memberContentUnsubscribed = writable<boolean>(false);
	let questions = writable<any>([...data.lesson.quiz]);

	let liked: boolean = false;
	let score = 0;
	let quizBtnDisabled = false;
	let actualQuestion = 1;
	let currentPage: Page;

	function checkAnswer(event: any, question: any) {
		const choice = event.target.children[0].innerText.toUpperCase();
		quizBtnDisabled = true;

		let updatedQuestion = { ...question }; // Create a shallow copy of the question object

		if (choice === question.answer.toUpperCase()) {
			score++;
			updatedQuestion.isRight = 'correct';
			event.target.style.borderColor = 'green';
		} else {
			updatedQuestion.isRight = 'incorrect';
			event.target.style.borderColor = 'red';
		}

		// Update the questions array with the new question object
		questions.update((questionsValue) => {
			const updatedQuestions = questionsValue.map((q: any) => {
				if (q === question) {
					return updatedQuestion;
				}
				return q;
			});
			return updatedQuestions;
		});
	}

	async function finishQuiz() {
		const { error } = await data.supabase
			.from('lessons')
			.update({ quiz: $questions })
			.eq('id', data.lesson.id)
			.select();
	}

	$: {
		if (data.session) {
			showMemberContent.set(data.tier === 'ABO' || data.paymentStatus === 'paid');
			memberContentUnsubscribed.set(data.tier === 'Keine' || data.paymentStatus === undefined);
		}
	}

	const channels = data.supabase
		.channel('custom-update-channel')
		.on(
			'postgres_changes',
			{ event: 'UPDATE', schema: 'public', table: 'lessons', filter: `id=eq.${data.lesson.id}` },
			(payload) => {
				if (payload.new.comments) {
					data.lesson.comments = payload.new.comments;
				}
				data.lesson.likes = payload.new.likes;
			}
		)
		.subscribe();

	const unsubscribe = page.subscribe((value) => {
		currentPage = value;
	});

	// Unsubscribe when the component is destroyed to avoid memory leaks
	onDestroy(() => {
		unsubscribe();
	});

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

<MainLayout
	title={`${data.lesson.ep} - ${data.lesson.title}`}
	description={`${data.lesson.description}`}
	imageUrl={`${data.lesson.img}`}
>
	<detail-page-wrapper>
		<status-bar>
			<button on:click={() => goto('/lektionen')}>Zurück</button>

			<social-box>
				<likes-box
					tabindex="0"
					role="button"
					on:keydown={handleLikeClick}
					on:click={handleLikeClick}
				>
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

		<detail-page-content>
			<left-side>
				<h1>{data.lesson.ep?.toUpperCase()} | {data.lesson.title}</h1>
				<p>{data.lesson.description}</p>
				<section>
					<Accordion open>
						<h2 slot="head">⚠️ Wichtige Infos:</h2>
						<div slot="details">
							<br />
							<ul>
								<li>👉 Schaue immer zuerst das Video ein Mal komplett an.</li>
								<li>👉 Versuche nachzuvollziehen und zu verstehen, was ich in dem Video zeige.</li>
								<li>👉 Beginne dann mit dem Nachbau des Web Projekts aus dem Tutorial.</li>
								<li>👉 Überprüfe dein Wissen indem du das Quiz absolvierst.</li>
								<li>
									👉 Nimm ein ähnliches Projekt und code es mit dem neu erlangten Wissen nach.
								</li>
							</ul>
							<br />
							🔥 Oder komm in die programmieren-lernen.rocks Community und erhalte zusätzlichen Deep
							Dive Content zu dieser Lektion und eine Bonus Challenge, die auf dem Wissen dieses Tutorials
							aufbaut.
						</div>
					</Accordion>
				</section>
				<h3>Part 1 - Free Coding Lektion</h3>

				<video-wrapper>
					{@html data.lesson.video1}
				</video-wrapper>
				<video-content>
					<article>
						{#if data.lesson.video1_content}
							{#each data.lesson.video1_content.split(/(<Gist.*?\/?>)/) as part}
								{#if part.startsWith('<Gist')}
									<!-- Extract the gistUrl from the part -->
									<svelte:component this={Gist} gistUrl={part.match(/gistUrl="([^"]*)"/)?.[1]} />
								{:else}
									<!-- Render non-Gist content -->
									{@html part}
								{/if}
							{/each}
						{/if}
					</article>
				</video-content>
				<h3>Part 2 - Members Coding Lektion</h3>

				{#if $showMemberContent}
					{#if data.lesson.video2 && data.lesson.video2_content}
						<video-wrapper>
							{@html data.lesson.video2}
						</video-wrapper>
						<video-content>
							<article>
								{#each data.lesson.video2_content.split(/(<Gist.*?\/?>)/) as part}
									{#if part.startsWith('<Gist') && part !== null}
										<!-- Extract the gistUrl from the part -->
										<svelte:component this={Gist} gistUrl={part.match(/gistUrl="([^"]*)"/)?.[1]} />
									{:else}
										<!-- Render non-Gist content -->
										{@html part}
									{/if}
								{/each}
							</article>
						</video-content>
					{/if}

					{#if data.lesson.video3 && data.lesson.video3_content}
						<h3>Part 3 - Members Coding Lektion</h3>
						<video-wrapper>
							{@html data.lesson.video3}
						</video-wrapper>
						<video-content>
							<article>
								{#each data.lesson.video3_content.split(/(<Gist.*?\/?>)/) as part}
									{#if part.startsWith('<Gist')}
										<svelte:component this={Gist} gistUrl={part.match(/gistUrl="([^"]*)"/)?.[1]} />
									{:else}
										{@html part}
									{/if}
								{/each}
							</article>
						</video-content>
					{/if}
					<!-- <AddComment {data} />
				<Comments {data} /> -->
				{/if}
			</left-side>

			<right-side>
				{#if $memberContentUnsubscribed}
					<no-abo-logged
						>Du hast kein aktives ABO. <a href="/mitglied-werden"><b>Jetzt kaufen!</b></a>
					</no-abo-logged>
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
				<h2>Dateien</h2>
				<ul>
					<li>
						<a
							href="/files/Handbuch_Frontend_Entwickler_2_of_4_v2.pdf"
							target="_blank"
							rel="noopener noreferrer"><Paperclip strokeWidth={1.5} size={20} /> Handbuch</a
						>
					</li>
					<li>
						<a href="/files/monaspace-v1.000.zip" target="_blank" rel="noopener noreferrer"
							><Paperclip strokeWidth={1.5} size={20} /> <span>Schriftart</span></a
						>
					</li>
				</ul>
				<Accordion>
					<h3 slot="head">Quiz <span>( {data.lesson.quiz.length} Fragen )</span></h3>
					<quiz-wrapper slot="details">
						{#each $questions as question, id}
							{#if id === actualQuestion - 1}
								<div class="question">
									{question?.question}
								</div>

								{#each question?.answers as answer, id (answer.answer)}
									<button
										disabled={quizBtnDisabled}
										on:click={(event) => checkAnswer(event, question)}
										><strong>{answer.answer.toUpperCase()}</strong>: {answer.value}</button
									>
								{/each}
								<answer-box>
									{#if question?.isRight === 'correct'}
										<b style="color: green">Korrekte Antwort 👍</b>
									{:else if question?.isRight === 'incorrect'}
										<b style="color: red;">Leider falsch 👎, korrekte Antwort: {question?.answer}</b
										>
									{/if}
								</answer-box>
								<button
									type="submit"
									disabled={!quizBtnDisabled}
									on:click={() => {
										actualQuestion++;
										quizBtnDisabled = false;
									}}
									>{actualQuestion === $questions.length
										? 'Quiz abschließen'
										: 'Nächste Frage'}</button
								>
								{#if actualQuestion === $questions.length}
									- oder -
									<br />
									<button
										class="do-it-again"
										disabled={!quizBtnDisabled}
										on:click={() => {
											quizBtnDisabled = false;
											questions.set([...data.lesson.quiz]);
											actualQuestion = 1;
										}}
									>
										Quiz erneut machen</button
									>
								{/if}
							{/if}
						{/each}
						{#if actualQuestion > $questions.length}
							<score-box>
								<strong
									>Ergebnis: {score} von {$questions.length} richtig {score > $questions.length - 2
										? '🥳'
										: '🫨'}</strong
								>
							</score-box>
						{/if}
					</quiz-wrapper>
				</Accordion>
				<Accordion>
					<h3 slot="head">Kommentar verfassen</h3>
					<AddComment slot="details" {data} />
				</Accordion>
				<Accordion>
					<h3 slot="head" id="kommentare">
						Kommentare <span>( {data.lesson.comments?.length} )</span>
					</h3>
					<Comments slot="details" {data} />
				</Accordion>

				<share-box>
					<ShareButtons
						slug={currentPage.url.pathname}
						title={`${data.lesson.ep} - ${data.lesson.title}`}
					/>
				</share-box>
			</right-side>
		</detail-page-content>
	</detail-page-wrapper>
</MainLayout>

<style>
	detail-page-wrapper {
		display: block;
		margin: 0 auto;
		padding: 0.5rem 0;
		min-height: 80vh;
		overflow: hidden;

		& h1 {
			font-size: 1.5rem;
			margin: 0.5rem 0;
			line-height: 1.4rem;
		}

		& h2 {
			font-size: 1.1rem;
		}

		& h3 {
			font-size: 1.05rem;
			padding: 0.6rem 0;
		}

		& p:not(video-content p) {
			border-bottom: 1px solid var(--blueAccent);
			padding-bottom: 1rem;
			color: var(--textAccent);
		}

		& status-bar {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid var(--blueAccent);
			margin-bottom: 1.5rem;
			padding-bottom: 1rem;

			& button {
				width: 100px;
				background-color: var(--bgContainer);
				border-bottom: 2px solid var(--blueAccent);
				padding: 0;

				&:hover {
					border: 2px solid var(--bgContainer);
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
					border-bottom: 2px solid var(--blueAccent);

					&:hover:not(comment-box) {
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
			display: flex;

			@media (width < 769px) {
				flex-wrap: wrap;
			}

			& left-side {
				width: 60%;
				position: relative;
				margin-right: 50px;
				margin-bottom: 1rem;
				background-color: var(--bgContainer);
				padding: 2rem;
				border-radius: 10px;

				@media (width < 769px) {
					width: 100%;
					margin: 0;
					padding: 1rem;
				}

				& section {
					padding: 1.5rem 0;
					border-bottom: 1px solid var(--blueAccent);

					& b {
						text-decoration: underline;
					}

					& ul {
						list-style-type: none;

						& li {
							margin: 0;
							font-size: 0.9rem;
							color: var(--textAccent);
						}
					}
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
					& article {
						border-bottom: 1px solid var(--blueAccent);

						& p {
							padding: 1.5rem 2rem;

							@media (width < 451px) {
								padding: 0.7rem 0.5rem;
								text-align: justify;
							}
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
				padding-left: 120px;
				margin: 1rem 0;
				display: flex;
				flex-direction: column;
				gap: 0.6rem;

				@media (width < 1440px) {
					padding-left: 0px;
				}

				@media (width < 769px) {
					width: 100%;
					margin: 1rem 0;
					padding: 0 1rem;
				}

				& h3 span {
					font-size: 0.8rem;
					font-weight: 600;
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

				& quiz-wrapper {
					display: block;
					text-align: center;

					& div.question {
						text-align: left !important;
					}

					& button {
						width: 100%;
						margin: 0.5rem 0;
						background-color: var(--bgContainer);

						&:hover {
							border-color: var(--mainBorder);
						}
					}

					& button[type='submit'] {
						margin-top: 1rem;
						background-color: var(--tertColor);

						&:disabled {
							background-color: var(--bgContainer);
							border-color: transparent;
							cursor: not-allowed;
						}
					}

					& button.do-it-again {
						background-color: var(--secondColor);
						&:disabled {
							background-color: var(--bgContainer);
							border-color: transparent;
							cursor: not-allowed;
						}
					}

					& answer-box {
						display: block;
						width: 100%;
						text-align: center;
						font-size: 0.8rem;
					}

					& score-box {
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: var(--bgContainer);
						height: 200px;
						width: 100%;
						border-radius: 10px;
					}
				}

				& no-abo-logged {
					order: 2;
					margin-top: 2rem;
				}

				& login-form {
					order: 2;
					margin-top: 0.5rem;
					padding-top: 2rem;
					border-top: 1px solid var(--blueAccent);

					@media (width < 451px) {
						width: 100%;
					}

					& p {
						border: none;
						padding: 0;
						text-align: center;

						@media (width < 1441px) {
							margin: 0;
						}

						& a {
							color: var(--secondColor);
						}
					}
				}
			}
		}

		& p a {
			color: var(--secondColor);
		}
	}
</style>
