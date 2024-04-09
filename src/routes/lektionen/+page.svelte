<script lang="ts">
	import { MessageCircle, Search, ThumbsUp } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { derived, writable } from 'svelte/store';
	import MainLayout from '../../layouts/MainLayout.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	let lessonsPerPage = 5;
	let lessonsToAddOnScroll = 5;

	const searchInput = writable('');
	const selectedCategory = writable('');
	const selectedSkill = writable('');

	const categoryFilterOptions = new Set(data.lessons.map((lesson) => lesson.topic));
	const skillFilterOptions = new Set(data.lessons.map((lesson) => lesson.skill));

	const filteredLessons = derived(
		[searchInput, selectedCategory, selectedSkill],
		([$searchInput, $selectedCategory, $selectedSkill]) => {
			return applyFilters();
		}
	);

	function applyFilters() {
		return data.lessons.filter(
			(lesson) =>
				(!$searchInput || (lesson.ep && lesson.ep.toLocaleLowerCase().includes($searchInput))) &&
				($selectedCategory === '' || lesson.topic === $selectedCategory) &&
				($selectedSkill === '' || lesson.skill === $selectedSkill)
		);
	}

	function handleScroll() {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

		if (scrollTop + clientHeight >= scrollHeight - 100) {
			lessonsPerPage += lessonsToAddOnScroll;
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
	});
</script>

<MainLayout
	title="Programmier / Coding Aufgaben & Challenges"
	description="Möchtest du Programmieren lernen oder dein Coding-Wissen erweitern? Tauche ein in die Welt des Codens mit unseren interaktiven Programmier-Challenges & Tutorials und lerne, wie du zum Meister des Codes wirst."
	imageUrl="../../images/social-share-image.jpg"
>
	<lessons-section>
		<filter-section>
			<Search size={20} strokeWidth={1.5} class="search-icon" />
			<input
				bind:value={$searchInput}
				on:input={applyFilters}
				type="search"
				name=""
				id=""
				placeholder="🔍 Lektion suchen"
			/>
			<select-filter>
				<select
					name="category-filter"
					id="category-filter"
					bind:value={$selectedCategory}
					on:change={applyFilters}
				>
					<option value="">Filtern nach Kategorie</option>

					{#each categoryFilterOptions as category}
						<option value={category}>{category}</option>
					{/each}
				</select>

				<select
					name="skill-filter"
					id="skill-filter"
					bind:value={$selectedSkill}
					on:change={applyFilters}
				>
					<option value="">Filtern nach Skill</option>

					{#each skillFilterOptions as skill}
						<option value={skill}>{skill}</option>
					{/each}
				</select>
			</select-filter>
		</filter-section>

		<grid-wrapper>
			{#each $filteredLessons.slice(0, lessonsPerPage) as lesson}
				<a href={`/lektionen/ep-${lesson.ep?.toLocaleLowerCase()}`}>
					<lesson-card>
						<left-side>
							<img
								width="640px"
								height="480px"
								src={lesson.img}
								alt={lesson.title}
								loading="lazy"
								srcset={`${lesson.img} 640w`}
								sizes="(max-width: 480px) 100vw, 640px"
							/>
						</left-side>

						<lesson-info>
							<h2>EP-{lesson.ep?.toUpperCase()} : {lesson.title}</h2>
							<info-box>
								<likes-box>
									<ThumbsUp size={20} strokeWidth={1.5} class="icon" />
									<span>( {lesson.likes} )</span>
								</likes-box>

								<comment-box>
									<MessageCircle size={20} strokeWidth={1.5} class="icon" />
									<span>( {lesson.comments?.length} )</span>
								</comment-box>

								<topic-box>
									<p>{lesson.skill}</p>
								</topic-box>

								<skill-box>
									<p>{lesson.topic}</p>
								</skill-box>
							</info-box>
							<p>{lesson.description?.substring(0, 1000)}</p>
						</lesson-info>
					</lesson-card>
				</a>
			{/each}
			{#if $filteredLessons.length === 0}
				<not-found>
					<h4>Nichts gefunden</h4>
				</not-found>
			{/if}
		</grid-wrapper>
	</lessons-section>
</MainLayout>

<style>
	lessons-section {
		display: block;
		margin: 0 auto;

		& filter-section {
			display: flex;
			justify-content: space-between;
			padding-bottom: 0.5rem;
			border-bottom: 1px solid var(--blueAccent);

			@media (width < 451px) {
				flex-wrap: wrap;
				gap: 0.7rem;
				padding-bottom: 1rem;
			}

			& .search-icon {
				display: none;
				position: absolute;
				top: 8.5%;
				left: 20.5%;

				@media (width < 451px) {
					top: 3%;
					left: 1%;
				}
			}

			& input {
				color: white;
				width: 30%;
				border-radius: 0.3rem;
				background-color: var(--bgContainer);
				border: none;
				border-bottom: 4px solid var(--bgContainer);
				font-size: 0.6rem;
				cursor: auto;
				padding-inline: 0.6rem;

				&::placeholder {
					color: var(--textAccent);
					font-size: 0.65rem;
				}

				&:focus-visible {
					outline: none;
				}

				@media (width <= 450px) {
					width: 100%;
					height: 35px;
					font-size: 0.7rem;

					&::placeholder {
						font-size: 0.8rem;
					}
				}
			}

			& select-filter {
				display: flex;
				gap: 1rem;
				flex-wrap: wrap;

				@media (width <= 450px) {
					gap: 0.7rem;
				}

				& select[id='category-filter'],
				select[id='skill-filter'] {
					border-radius: 0.3rem;
					background-color: var(--bgContainer);
					border: none;
					border-bottom: 4px solid var(--bgContainer);
					color: var(--textAccent);
					padding-inline: 2rem;

					@media (width <= 450px) {
						min-width: 100% !important;
						height: 35px;
					}
				}
			}
		}

		& grid-wrapper {
			display: grid;
			grid-template-columns: 1fr;
			min-height: 60vh;

			& a {
				text-decoration: none;
				color: white;

				& lesson-card {
					display: flex;
					gap: 10px;
					overflow: hidden;
					/* border-bottom: 1px solid var(--blueAccent); */
					padding: 1rem 0;

					@media (width < 769px) {
						flex-direction: column;
						padding: 1rem 0;
					}

					& left-side {
						display: flex;
						width: 50%;
						align-items: center;

						@media (width < 769px) {
							width: 100%;
						}

						& img {
							width: 100%;
							height: auto;
							border-radius: 20px;
							object-fit: cover;

							@media (width < 769px) {
								width: 100%;
							}
						}
					}

					& lesson-info {
						width: 70%;
						display: flex;
						height: 100%;
						flex-direction: column;
						gap: 1rem;
						padding: 1rem 1rem;

						@media (width < 1921px) {
							width: 60%;
						}

						@media (width < 769px) {
							width: 100%;
							padding: 1rem 0;
						}

						& h2 {
							margin-bottom: -0.5rem;
						}

						& p {
							color: var(--textAccent);
							font-weight: 200;

							@media (width < 1025px) {
								font-size: 1rem;
								line-height: 1.1rem;
							}

							@media (width < 769px) {
								text-align: justify;
								font-size: 1rem;
								line-height: 1.1rem;
							}
						}

						& info-box {
							display: flex;
							gap: 2rem;

							@media (width < 769px) {
								order: 3;
								flex-wrap: wrap;
								justify-content: space-between;
								gap: 0;
							}

							& p {
								@media (width < 1025px) {
									font-size: 0.7rem;
									line-height: 1.1rem;
								}
							}
						}

						& likes-box,
						comment-box,
						skill-box,
						topic-box {
							width: auto;
							display: flex;
							align-items: center;
							gap: 0.4rem;
							font-size: 0.75rem;

							& .icon {
								margin-top: -0.16rem;
							}
						}

						& skill-box,
						topic-box {
							background-color: var(--blueAccent);
							padding: 0 0.9rem;
							border-radius: 10px;
							width: auto;
							font-size: 0.7rem;
							/* border-bottom: 3px solid var(--blueAccent); */

							& p {
								padding-top: 0.1rem;
								font-weight: 400;
							}
						}
					}
				}
			}

			& not-found {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
