<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import Tooltip from '$lib/utils/Tooltip.svelte';
	import { ShieldCheck } from 'lucide-svelte';
	import MainLayout from '../../layouts/MainLayout.svelte';

	export let data: PageData;
	const activeButton = writable(0);

	let { session, prices, interval, tier, paymentStatus } = data;
	$: ({ prices, interval } = data);

	const buttons = [
		{ label: 'Monatlich', path: '/mitglied-werden', type: 'first' },
		{ label: 'Jährlich', path: '/mitglied-werden?interval=year', type: 'second' }
	];

	function navigateTo(url: string, index: number) {
		goto(url);
		activeButton.set(index);
	}
</script>

<MainLayout
	title="Mitglied werden"
	description="Entdecke die spannende Welt des Programmierens und tauche ein in eine lebendige Community von Gleichgesinnten! Mit meiner einzigartigen Coding-Membership erhältst du Zugang zu hochwertigem Content und Challenges, die dir helfen, Deine Fähigkeiten im Programmieren zu verbessern. Gerade, wenn du gerade erst angefangen oder bereits Erfahrung hast, meine Plattform bietet maßgeschneiderte Lerninhalte und persönliche Unterstützung, um Dir auf Deinem Weg zum erfolgreichen Entwickler zu helfen. Werde jetzt Teil meiner Community und entdecke die endlosen Möglichkeiten des Programmierens!"
	imageUrl=""
>
	<subscription-page-wrapper>
		<top-slogan>
			<h1>All-Access Mitgliedschaft</h1>
			<p>
				Werde ein gefragter Entwickler mit dem Zugriff auf alle Coding Lektionen, Challenges,
				Experten Blog und Community. Wachse an deinen Aufgaben und bekomme einen <span
					class="underline">Job in der IT</span
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
			Spare Jetzt 20% auf das Jahresabo!
		</top-slogan>

		<subscription-hero>
			{#each prices as price, _i (price.id)}
				<subscription-card>
					<b>{price.product.name}</b>
					<p>
						<br />
						<span>{price.unit_amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} </span>
						€ {price.unit_amount < 200 ? (interval === 'month' ? '/ Monat' : ' / Jahr') : ''}
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

		<payment-box>
			<slogan-box>
				<ShieldCheck strokeWidth={1.5} class="icon" />
				<p>Gesicherte AES-256-verschlüsselte Zahlungen mit Stripe:</p>
			</slogan-box>

			<payment-icons>
				<!-- 	<img src="/images/stripe.svg" width="50px" height="50px" alt="stripe payment icon" /> -->
				<img src="/images/paypal.svg" width="50px" height="50px" alt="paypal payment icon" />
				<img src="/images/giropay.svg" width="50px" height="50px" alt="giropay payment icon" />
				<img src="/images/klarna.svg" width="50px" height="50px" alt="klarna payment icon" />
				<img
					src="/images/mastercard.svg"
					width="50px"
					height="50px"
					alt="mastercard payment icon"
				/>
				<img src="/images/visa.svg" width="50px" height="50px" alt="visa payment icon" />
			</payment-icons>
		</payment-box>

		<subscription-content-1>
			<background-triangle1 class="rotate"></background-triangle1>
			<background-triangle2 class="rotate"></background-triangle2>
			<background-triangle3 class="rotate"></background-triangle3>
			<p>Praktisch orientiert</p>
			<h2>Was du lernen wirst</h2>
			<ul>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Erlernen
						gefragter Programmiersprachen, Frameworks, Tools. Anwendung modernster Programmier-Techniken
						mit Best Practice Fokus.
					</span>
				</li>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Entwickel
						eine praxisnahe Routine sowie Anwendungen, um Dein Portfolio zu erweitern und potenzielle
						Arbeitgeber zu beeindrucken.
					</span>
				</li>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Erwirb Kenntnisse
						in einer Vielzahl von Themen wie z.B Webentwicklung, Datenbanken and Headless Backends (
						Firebase, Supabase ).
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
		</subscription-content-1>
		<subscription-content-2>
			<p>Zielgruppe</p>
			<h2>Für wen ist es geeignet?</h2>
			<ul>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Angehende
						Coder, die die für eine erfolgreiche Karriere in der Software- bzw. Web-Entwicklung erforderlichen
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
						& Azubis sowie Quereinsteiger, die ihre formale Ausbildung durch praktisches, praxisnahes
						Lernen ergänzen möchten.
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
		</subscription-content-2>
	</subscription-page-wrapper>
</MainLayout>

<style>
	subscription-page-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		margin: auto;
		padding: 2rem 0;
		justify-content: center;

		@media (width < 451px) {
			padding: 0;
			margin-top: 1rem;
		}

		& top-slogan {
			width: 65%;
			margin: 0 auto;
			text-align: center;

			@media (width < 451px) {
				width: 100%;
			}

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
					width: 15%;

					@media (width < 451px) {
						width: 25%;
					}

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
			gap: 3rem;
			width: 100%;
			margin-bottom: 2rem;
			justify-content: center;

			@media (width < 769px) {
				gap: 1rem;
			}

			@media (width < 451px) {
				flex-wrap: wrap;
				gap: 2rem;
			}

			@media (width > 768px) {
				gap: 1rem;
			}
			
			@media (width > 1440px) {
				gap: 2rem;
			}


			& subscription-card {
				background-color: #3536508b;
				padding: 3rem;
				border-radius: 0.4rem;
				border: 3px solid rgba(128, 128, 128, 0.194);
				-webkit-box-shadow: 0px 20px 20px -17px var(--tertColor);
				-moz-box-shadow: 0px 20px 20px -17px var(--tertColor);
				box-shadow: 0px 20px 20px -17px var(--tertColor);
				text-align: center;

				@media (width < 769px) {
					padding: 1.5rem;
				}

				@media (width < 451px) {
					width: 100%;
					padding: 1.5rem;
				}

				& ul {
					margin: 2rem 0;
					display: flex;
					flex-direction: column;
					text-align: left;

					& li {
						font-weight: 300;
						color: var(--textAccent);
						word-wrap: break-word;
						float: left;
						display: flex;
						align-items: center;
						gap: 0.8rem;

						& span {
							align-self: baseline;
							padding-top: 0.1rem;
						}
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
		& payment-box {
			margin: 0 auto;

			& slogan-box {
				display: flex;
				align-items: center;
				gap: 0.3rem;

				@media (width < 451px) {
					display: inline-block;
					text-align: center;
				}

				& p {
					margin-top: 0.25rem;
				}
			}

			& payment-icons {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				gap: 0.5rem;
			}
		}

		& subscription-content-1,
		subscription-content-2 {
			position: relative;
			text-align: center;
			margin-top: 2rem;

			@media (width < 451px) {
				margin: 0;
			}

			& ul {
				display: inline-block;
				text-align: left;
				width: 60ch;

				@media (width < 451px) {
					width: 100%;
				}

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
		}

		& subscription-content-1 {
			& background-triangle1 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				left: 0rem;
				top: 10rem;
				opacity: 20%;

				@media (width < 451px) {
					display: none;
				}
			}

			& background-triangle2 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				left: 2rem;
				top: 5rem;
				opacity: 40%;

				@media (width < 451px) {
					display: none;
				}
			}
			& background-triangle3 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				left: 4rem;
				bottom: 0;
				opacity: 30%;

				@media (width < 451px) {
					display: none;
				}
			}
		}

		& subscription-content-2 {
			@media (width < 451px) {
				margin-top: -1rem;
			}

			& background-triangle1 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				right: 0rem;
				top: 10rem;
				opacity: 20%;

				@media (width < 451px) {
					display: none;
				}
			}

			& background-triangle2 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				right: 2rem;
				top: 5rem;
				opacity: 40%;

				@media (width < 451px) {
					display: none;
				}
			}
			& background-triangle3 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				right: 4rem;
				bottom: 0;
				opacity: 30%;

				@media (width < 451px) {
					display: none;
				}
			}
		}
	}
</style>
