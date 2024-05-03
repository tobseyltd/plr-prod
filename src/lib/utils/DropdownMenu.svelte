<script lang="ts">
	import { ArrowUpRightSquare, ChevronRight, Menu } from 'lucide-svelte';
	import { onNavigate } from '$app/navigation';
	import { afterUpdate } from 'svelte';

	export let data: any;

	let menuOpen = false;

	onNavigate(() => {
		menuOpen = false;
	});

	function handleClickOutside({ target }: any) {
		if (menuOpen && !target.closest('header')) {
			menuOpen = false;
		}
	}

	afterUpdate(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<section>
	<button on:click={() => (menuOpen = !menuOpen)}><Menu strokeWidth={1.5} /></button>

	<menu-content-wrapper class:show={menuOpen}>
		<menu-content>
			<ul>
				<li>
					<a href="/lektionen">Lektionen <ArrowUpRightSquare strokeWidth={1.5} size={20} /></a>
				</li>
				<li>
					<a href="/mitglied-werden"
						>Mitgliedschaft <ArrowUpRightSquare strokeWidth={1.5} size={20} /></a
					>
				</li>
				<li>
					<a href="/aufbaukurs">Aufbaukurs <ArrowUpRightSquare strokeWidth={1.5} size={20} /></a>
				</li>
				<li><a href="/account">Account <ArrowUpRightSquare strokeWidth={1.5} size={20} /></a></li>
				{#if data}
					<form action="/logout" method="POST">
						<button type="submit"
							><span>Logout</span> <ArrowUpRightSquare strokeWidth={1.5} size={20} /></button
						>
					</form>
				{/if}
			</ul>
		</menu-content>
	</menu-content-wrapper>
</section>

<style>
	section {
		position: relative;
		display: none;

		@media (width < 769px) {
			display: block;
		}

		& button {
			background-color: transparent;
			border: none;
		}

		& menu-content-wrapper {
			display: none;
			position: absolute;
			top: 120%;
			transform: translateX(-70%);
			background-color: #353650;
			width: auto;
			border-radius: 10px;
			z-index: 999;
			height: auto;
		}

		& menu-content {
			padding: 1rem;
			display: block;
			text-align: right;
			z-index: 9999;
			position: relative;

			& ul {
				& li:nth-child(even) {
					margin: 0.8rem 0;
				}
				& a {
					text-decoration: none;
					color: white;
					cursor: pointer;
					font-size: 1.2rem;
					display: flex;
					align-items: center;
					justify-content: end;
					gap: 0.2rem;
				}

				& form {
					display: flex;
					justify-content: end;
				}

				& button {
					padding: 0;
					margin: 0;
					background-color: transparent;
					border: none;
					font-size: 1rem;
					text-shadow: none;
					width: auto;
					text-align: right;
					font-weight: 100;

					& span {
						margin-right: 0.3rem;
					}
				}
			}
		}

		& .show {
			display: block;
		}

		& :global(header) {
			z-index: 9999;
		}
	}
</style>
