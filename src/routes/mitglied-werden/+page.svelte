<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import Tooltip from '$lib/utils/Tooltip.svelte';

	export let data: PageData;
	const activeButton = writable(0);

	let { session, prices, interval, tier, paymentStatus } = data;
	$: ({ prices, interval } = data);

	/* console.log(prices); */

	const buttons = [
		{ label: 'Monatlich', path: '/mitglied-werden', type: 'first' },
		{ label: 'Jährlich', path: '/mitglied-werden?interval=year', type: 'second' }
	];

	function navigateTo(url: string, index: number) {
		goto(url);
		activeButton.set(index);
	}
</script>

<subscription-page-wrapper>
	<top-slogan>
		<h1>All-Access Mitgliedschaft</h1>
		<p>
			Werde ein gefragter Entwickler mit dem Zugriff auf alle Coding Lektionen, Challenges, Experten
			Blog und Community. Wachse an deinen Aufgaben und bekomme einen <span class="underline"
				>Job in der IT</span
			> ohne Probleme.
		</p>
		<button-group>
			{#each buttons as button, index}
				<button
					class:active={index === $activeButton}
					on:click={() => navigateTo(button.path, index)}
					data-type={button.type}
				>
					{button.label}
				</button>
			{/each}
		</button-group>
	</top-slogan>

	<subscription-hero>
		{#each prices as price, _i (price.id)}
			<subscription-card>
				<b>{price.product.name}</b>
				<p>
					<br />
					<span>{price.unit_amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} </span> € {price.unit_amount <
					200
						? interval === 'month'
							? '/ Monat'
							: ' / Jahr'
						: ''}
					<br />
				</p>

				<ul>
					{#each price.product.features as feature}
						<li>
							<span>
								<img src="/images/success-top.svg" alt="video icon" width="25px" height="25px" />
							</span>
							{feature}
						</li>
					{/each}
				</ul>
				{#if tier === 'ABO' || paymentStatus === 'paid'}
					<Tooltip tooltip="Mitgliedschaft aktiv, verwalte diese in deinem Account">
						<button class="button" disabled>{price.product.call_to_action} </button>
					</Tooltip>
				{:else}
					<button
						on:click={() => {
							if (session) {
								goto(`/api/stripe/checkout?id=${price.id}`);
							} else {
								goto('/registrieren');
							}
						}}
						class="button"
						>{price.product.call_to_action}
					</button>
				{/if}
				<br />
			</subscription-card>
		{/each}
	</subscription-hero>

	<subscription-content>
		<p>Praktisch orientiert</p>
		<h2>Was du lernen wirst</h2>
		<ul>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Erlernen gefragter
					Programmiersprachen, Frameworks, Tools. Anwendung modernster Programmier-Techniken mit Best
					Practice Fokus.
				</span>
			</li>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Entwickel eine
					praxisnahe Routine sowie Anwendungen, um Dein Portfolio zu erweitern und potenzielle Arbeitgeber
					zu beeindrucken.
				</span>
			</li>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Erwirb Kenntnisse
					in einer Vielzahl von Themen wie z.B Webentwicklung, Datenbanken and Headless Backends ( Firebase,
					Supabase ).
				</span>
			</li>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Eröffne Dir
					neue Karrierechancen und erhöhe deine Verdienstmöglichkeiten durch anwendbares Fachwissen,
					sowie einem tiefgreifenden Verständis.
				</span>
			</li>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Bleibe mit
					den neuesten Technologien und Trends auf dem Laufenden.
				</span>
			</li>
		</ul>
	</subscription-content>
	<subscription-content>
		<p>Zielgruppe</p>
		<h2>Für wen ist es geeignet?</h2>
		<ul>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Angehende Coder,
					die die für eine erfolgreiche Karriere in der Software- bzw. Web-Entwicklung erforderlichen
					Fähigkeiten erlernen möchten.
				</span>
			</li>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Fachleute,
					die ihr Wissen erweitern und über die neuesten Trends und Technologien auf einem aktuellen
					Stand bleiben wollen.
				</span>
			</li>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Unternehmer,
					die ihre eigenen Softwareprodukte bzw. Web-Apps mit aktuellen Tech-Stacks entwickeln möchten.
				</span>
			</li>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Studierende
					& Azubis sowie Quereinsteiger, die ihre formale Ausbildung durch praktisches, praxisnahes Lernen
					ergänzen möchten.
				</span>
			</li>
			<li>
				<span>
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Jeder, der
					neugierig auf Programmierung ist und die Welt der modernen Softwareentwicklung erkunden möchte.
				</span>
			</li>
		</ul>
		<background-triangle1 class="rotate"></background-triangle1>
		<background-triangle2 class="rotate"></background-triangle2>
		<background-triangle3 class="rotate"></background-triangle3>
	</subscription-content>
</subscription-page-wrapper>

<style>
	subscription-page-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		margin: 0 auto;
		width: var(--wrapperWidth);
		padding: 2rem 0;
		justify-content: center;

		& top-slogan {
			width: 65%;
			margin: 0 auto;
			text-align: center;

			/* 	& a {
				padding: 0.5rem 2rem;
				background-color: var(--tertColor);
				color: white;
				text-decoration: none;
			} */

			& p {
				color: rgba(239, 238, 238, 0.732);
			}

			& * {
				margin: 1rem 0;
			}

			& button-group {
				display: flex;
				justify-content: center;

				& button {
					border-radius: 0px;
					background-color: transparent;
					font-size: 0.65em;
					padding: 0.2rem 1.5rem;

					&:not(.active) {
						&:hover {
							background-color: #0d1c6151;
						}
					}

					&[data-type='first'] {
						border-top-left-radius: 10px;
						border-bottom-left-radius: 10px;
					}

					&[data-type='second'] {
						border-top-right-radius: 10px;
						border-bottom-right-radius: 10px;
					}
				}

				& .active {
					background-color: var(--tertColor);
				}
			}
		}

		& subscription-hero {
			display: flex;
			gap: 2rem;
			width: 100%;
			margin-bottom: 2rem;
			justify-content: center;

			& subscription-card {
				background-color: #3536508b;
				padding: 3rem;
				margin-left: 4rem;
				border-radius: 0.4rem;
				border: 3px solid rgba(128, 128, 128, 0.194);
				-webkit-box-shadow: 0px 20px 20px -17px var(--tertColor);
				-moz-box-shadow: 0px 20px 20px -17px var(--tertColor);
				box-shadow: 0px 20px 20px -17px var(--tertColor);
				text-align: center;

				& ul {
					margin: 2rem 0;
					& li {
						display: flex;
						align-items: center;
						gap: 0.7rem;
						font-weight: 300;
						color: var(--textAccent);
					}
				}

				& b {
					margin-bottom: 3rem;
					background: #5170fe;
					background-clip: text;
					background: -webkit-radial-gradient(
						ellipse farthest-side at right center,
						#5170fe 0%,
						#ff0066 100%
					);
					background: -moz-radial-gradient(
						ellipse farthest-side at right center,
						#5170fe 0%,
						#ff0066 100%
					);
					background: radial-gradient(
						ellipse farthest-side at right center,
						#5170fe 0%,
						#ff0066 100%
					);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					font-weight: 700;
					font-size: 1.5rem;
				}
				& p {
					text-align: center;
					margin-bottom: 1rem;
					color: var(--textAccent);

					& span {
						font-size: 2rem;
						color: var(--secondColor);
						letter-spacing: -5px;
						font-weight: 700;
					}
				}

				& h2 {
					margin-bottom: 1.3rem;
					font-size: 1.2rem;
				}

				& ul {
					margin: 2rem 0;

					& li {
						font-weight: 300;
						color: white;
					}
				}

				& [data-tooltip]:before {
					width: 300px;
					bottom: -115%;
					left: auto;
				}

				& [data-tooltip]:after {
					top: 60px;
					left: auto;
				}

				& button {
					width: 100%;
					position: relative;

					&:hover {
						background-color: #ff0066b9;
					}

					&:disabled {
						background-color: var(--bgContainer);
					}
				}
			}
		}

		& subscription-content {
			position: relative;
			text-align: center;

			& ul {
				display: inline-block;
				text-align: left;
				width: 60ch;

				& li {
					color: rgba(211, 211, 211, 0.732);
					margin-bottom: 1rem;

					& span {
						display: flex;
						gap: 0.4rem;
					}
				}
			}

			& *:not(img) {
				margin: 1rem 0;
			}

			& p {
				color: var(--tertColor);
			}

			& background-triangle1 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				right: 0rem;
				top: 10rem;
				position: absolute;
				display: block;
				width: 40px;
				height: 40px;
				background: rgb(62, 100, 132);
				background: linear-gradient(0deg, rgb(34, 85, 195) 0%, rgb(3, 76, 107) 100%);
				opacity: 20%;
			}

			& background-triangle2 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				right: 2rem;
				top: 5rem;
				position: absolute;
				display: block;
				width: 40px;
				height: 40px;
				background: rgb(62, 100, 132);
				background: linear-gradient(0deg, rgb(34, 85, 195) 0%, rgb(3, 76, 107) 100%);
				opacity: 40%;
			}
			& background-triangle3 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				right: 4rem;
				bottom: 0;
				position: absolute;
				display: block;
				width: 40px;
				height: 40px;
				background: rgb(62, 100, 132);
				background: linear-gradient(0deg, rgb(23, 52, 79) 0%, rgb(3, 52, 107) 100%);
				opacity: 30%;
			}
		}
	}
</style>
