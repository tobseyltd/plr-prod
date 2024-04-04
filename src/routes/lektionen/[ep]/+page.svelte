<script lang="ts">
	import { writable } from 'svelte/store';
	import LoginForm from '../../login/LoginForm.svelte';
	import type { PageData } from './$types';
	import Gist from '$lib/utils/Gist.svelte';
	import { goto } from '$app/navigation';
	import { ThumbsUp, MessageCircle, ExternalLink, Github } from 'lucide-svelte';
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

	interface Link {
		icon: string;
		link: string;
		title: string;
	}

	const linkMap: any = {
		Github: Github,
		Website: ExternalLink
	};

	const links = data.lesson.files?.map((link: Link) => {
		const iconComponent = linkMap[link.icon];

		return {
			...link,
			icon: iconComponent
		};
	});

	function checkAnswer({ target }: any, question: any) {
		const handleAnswerClick = () => {
			let choice = target.children[0];
			const correctAnswer = question.answer.toUpperCase();

			// Check if choice and innerText are valid
			if (choice && choice.innerText) {
				quizBtnDisabled = true;

				let updatedQuestion = { ...question };
				if (choice.innerText.toUpperCase() === correctAnswer) {
					choice.innerText = `👍 ` + choice.innerText;

					score++;
					updatedQuestion.isRight = 'correct';
					target.style.borderColor = 'green';
				} else {
					choice.innerText = `👎 ` + choice.innerText;
					updatedQuestion.isRight = 'incorrect';
					target.style.borderColor = 'red';

					// Highlight the correct answer
					const correctButton = [...target.parentElement.children].find(
						(answerButton: any) => answerButton.firstChild.innerText === correctAnswer
					);

					if (correctButton) {
						correctButton.style.borderColor = 'green';
					}
				}

				// Update the questions array with the new question object
				questions.update((questionsValue: any[]) => {
					const updatedQuestions = questionsValue.map((q: any) => {
						if (q === question) {
							return updatedQuestion;
						}
						return q;
					});
					return updatedQuestions;
				});
			} else {
				// Retry after a short delay if choice or innerText are undefined
				setTimeout(() => {
					handleAnswerClick();
				}, 100);
			}
		};

		// Call handleAnswerClick initially
		handleAnswerClick();
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
			(payload: { new: { comments: any; likes: any; }; }) => {
				if (payload.new.comments) {
					data.lesson.comments = payload.new.comments;
				}
				data.lesson.likes = payload.new.likes;
			}
		)
		.subscribe();

	const unsubscribe = page.subscribe((value: any) => {
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
	title={`EP-${data.lesson.ep} - ${data.lesson.title}`}
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
					<ThumbsUp size={18} strokeWidth={1.5} class="icon" />
					<span>( {data.lesson.likes} )</span>
				</likes-box>
				<a href="#kommentare">
					<comment-box>
						<MessageCircle size={18} strokeWidth={1.5} class="icon" />
						<span>( {data.lesson.comments?.length} )</span>
					</comment-box>
				</a>
			</social-box>
		</status-bar>

		<detail-page-content>
			<left-side>
				<skill-topic-box>
					<topic-box>
						{data.lesson.skill}
					</topic-box>

					<skill-box>
						{data.lesson.topic}
					</skill-box>
				</skill-topic-box>
				<video-wrapper>
					{@html data.lesson.video1}
				</video-wrapper>

				<!-- <img src={`../.${data.lesson.img}`} alt="" /> -->
				<h1 style="margin-top: 1.5rem;">
					EP-{data.lesson.ep?.toUpperCase()} | {data.lesson.title}
				</h1>
				<p>{data.lesson.description}</p>

				<section>
					<Accordion open>
						<h2 slot="head">⚠️ Wichtige Infos:</h2>
						<div slot="details">
							<br />
							<ul>
								<li>👉 Schaue immer zuerst das Video ein Mal komplett an.</li>
								<li>👉 Versuche nachzuvollziehen und zu verstehen, was ich in dem Video zeige.</li>
								<li>👉 Lade dir die Assets aus dem GitHub Repository</li>
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
				<!-- <h3>Part 1 - Free Coding Lektion</h3>

				<video-wrapper>
					{@html data.lesson.video1}
				</video-wrapper>
				<video-content>
					<article>
						{#if data.lesson.video1_content}
							{#each data.lesson.video1_content.split(/(<Gist.*?\/?>)/) as part}
								{#if part.startsWith('<Gist')}
									<svelte:component this={Gist} gistUrl={part.match(/gistUrl="([^"]*)"/)?.[1]} />
								{:else}
									{@html part}
								{/if}
							{/each}
						{/if}
					</article>
				</video-content> -->
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
				{:else}
					<p style="font-size: .8rem;">
						Sichbar nach Abschluß einer <a href="/mitglied-werden">Mitgliedschaft</a>
					</p>
				{/if}
			</left-side>

			<aside>
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
				<h2>Links</h2>
				<ul>
					{#each links as link}
						<li>
							<a href={link.link} target="_blank" rel="noopener noreferrer">
								<svelte:component this={link.icon} strokeWidth={1.5} size={20} />
								<span style="padding-top: 3px;"> {link.title}</span>
							</a>
						</li>
					{/each}
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
									>
										<strong>{answer.answer.toUpperCase()}</strong>: {answer.value}
									</button>
								{/each}
								<!-- <answer-box>
									{#if question?.isRight === 'correct'}
										<b style="color: green">Korrekte Antwort 👍</b>
									{:else if question?.isRight === 'incorrect'}
										<b style="color: red;">Leider falsch 👎, korrekte Antwort: {question?.answer}</b
										>
									{/if}
								</answer-box> -->
								<button
									type="submit"
									disabled={!quizBtnDisabled}
									on:click={() => {
										actualQuestion++;
										quizBtnDisabled = false;
									}}
									>{actualQuestion === $questions.length ? 'Quiz abschließen' : 'Nächste Frage'}
								</button>
								<!-- 	{#if actualQuestion === $questions.length}
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
								{/if} -->
							{/if}
						{/each}
						{#if actualQuestion > $questions.length}
							<score-box>
								<strong
									>Ergebnis: {score} von {$questions.length} richtig {score / $questions.length >=
									0.8
										? '🥳'
										: '😒'}</strong
								>
							</score-box>
							<button
								class="do-it-again"
								on:click={() => {
									quizBtnDisabled = false;
									questions.set(data.lesson.quiz);
									actualQuestion = 1;
									score = 0;
								}}
							>
								Quiz erneut machen
							</button>
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
			</aside>
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
				padding: 0;
				font-size: 0.6rem;

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
					padding: 0.1rem 0.5rem;
					border-radius: 10px;
					display: flex;
					align-items: center;
					gap: 0.4rem;
					font-size: 0.7rem;
					cursor: pointer;

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

				& skill-topic-box {
					display: flex;
					justify-content: start;
					gap: 0.5rem;

					& skill-box,
					topic-box {
						display: flex;
						align-items: center;
						gap: 0.4rem;
						background-color: var(--blueAccent);
						padding: 0 0.9rem;
						border-radius: 10px;
						width: auto;
						font-size: 0.6rem;
						/* border-top: 0.5px solid var(--secondColor); */
						margin-bottom: 0.5rem;
					}
				}

				& img {
					width: 100%;
					border-radius: 10px;
					margin-bottom: 1rem;
					overflow: hidden;
				}

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
						padding: 1rem 2rem;
						background-color: var(--bgContainer);
						color: white;
						border-radius: 10px;
						white-space: wrap;
						width: auto;
						font-size: 0.8rem;
						text-align: center;

						& a {
							color: white;
						}

						@media (width < 451px) {
							padding: 0.7rem 1rem;
						}
					}
				}

				& h3 {
					padding-top: 2rem;
				}
			}

			& aside {
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
						font-size: 0.9rem;
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
						border: 1px solid var(--secondColor);
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
