<script lang="ts">
	import { MessageCircle, Search, ThumbsUp } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { derived, writable } from 'svelte/store';
	import MainLayout from '../../layouts/MainLayout.svelte';

	export let data: PageData;

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
</script>

<MainLayout title="Programmier / Coding Aufgaben & Challenges" description="" imageUrl="">
	<lessons-section>
		<filter-section>
			<Search size={20} strokeWidth={1.5} class="search-icon" />
			<input
				bind:value={$searchInput}
				on:input={applyFilters}
				type="search"
				name=""
				id=""
				placeholder="Lektion suchen"
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
			{#each $filteredLessons as lesson}
				<lesson-card>
					<img src={lesson.img} alt={lesson.title} loading="lazy" />

					<a href={`/lektionen/ep-${lesson.ep}`}>
						<lesson-info>
							<h2>EP-{lesson.ep} : {lesson.title}</h2>
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
									{lesson.skill}
								</topic-box>
								<skill-box>
									{lesson.topic}
								</skill-box>
							</info-box>
							<p>{lesson.description}</p>
						</lesson-info>
					</a>
				</lesson-card>
			{/each}
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
			border-bottom: 1px solid #2d39db57;

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
				padding-inline-start: 2.2rem;

				&:focus-visible {
					outline: none;
				}

				@media (width < 451px) {
					width: 100%;
					font-size: 0.7rem;
				}
			}

			& select-filter {
				display: flex;
				gap: 1rem;

				& select {
					border-radius: 0.3rem;
					background-color: var(--bgContainer);
					border: none;
					border-bottom: 4px solid var(--bgContainer);
					color: white;
					padding-inline: 2rem;

					@media (width < 451px) {
						width: 100%;
					}
				}
			}
		}

		& grid-wrapper {
			display: grid;
			grid-template-columns: 1fr;

			& lesson-card {
				display: flex;
				gap: 10px;
				overflow: hidden;
				border-bottom: 1px solid #2d39db57;
				padding: 1.5rem 0;

				& img {
					width: 30%;
					height: auto;
					border-radius: 20px;
				}

				& a {
					text-decoration: none;
					color: white;
				}

				& lesson-info {
					& h2 {
						margin-bottom: -0.5rem;
					}

					display: flex;
					height: 100%;
					flex-direction: column;
					gap: 1rem;
					padding: 1rem 1rem;

					& p {
						color: var(--textAccent);
						font-weight: 200;
					}

					& info-box {
						display: flex;
						gap: 2rem;
					}

					& likes-box,
					comment-box,
					skill-box,
					topic-box {
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
						background-color: var(--bgContainer);
						padding: 0.01rem 0.9rem;
						border-radius: 20px;
						width: auto;
					}

					& skill-box {
						border: 1px solid var(--secondColor);
					}

					& topic-box {
						border: 1px solid var(--tertColor);
					}
				}
			}
		}
	}
</style>
