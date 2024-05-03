<script lang="ts">
	import Accordion from '$lib/utils/Accordion.svelte';
	import MainLayout from '../../layouts/MainLayout.svelte';
	import { ShieldCheck } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let { session } = data;
</script>

<MainLayout
	title="Quereinsteiger Intensiv-Aufbaukurs"
	description="Job wechseln? Du bist Quereinsteiger? Hier lernst Du das Programmieren. Ich biete Dir hier die Möglichkeit, Webentwicklung zu erlernen. HTML, CSS und JavaScript in 3 Monaten? Das ist möglich! Egal, ob Du ein Anfänger bist oder bereits Erfahrung hast, meine Videos werden Dir helfen, Deine Programmierkenntnisse auf das nächste Level zu bringen."
	imageUrl="https://www.programmieren-lernen.rocks/images/social-share-web-image.jpg"
>
	<page-wrapper>
		<top-slogan>
			<h1>Jetzt Programmieren in <br /> <span class="highlight">3 MONATEN</span> erlenen.</h1>
			<p>
				Werde mit meiner Hilfe ein gefragter Web-Entwickler mit dem speziell konzipierten Aufbaukurs
				für Anfänger bzw. Quereinsteiger. <b>Du hast keine Vorerfahrung? Kein Problem! </b>Als
				ehemaliger Dozent für Weiterbildungen vom Arbeitsamt über Bildungsgutscheine, weiß ich ganz
				genau, wie man Menschen ohne Vorerfahrung das Programmieren beibringt! Wachse an deinen
				Aufgaben und hol Dir Deinen
				<span class="highlight">JOB IN DER IT </span> mit Leichtigkeit.
			</p>
		</top-slogan>

		<price-section>
			<price-card>
				<b>Aufbaukurs</b>
				<p>
					<br />
					<span> 3790,90 </span>
					€
				</p>

				<ul>
					<li>
						<span>
							<img src="/images/success-top.svg" alt="video icon" width="25px" height="25px" />
						</span>
						3 Monate Intensiv-Aufbaukurs
					</li>
					<li>
						<span>
							<img src="/images/success-top.svg" alt="video icon" width="25px" height="25px" />
						</span>
						Persönlicher Unterricht mit mir (2h / Woche)
					</li>
					<li>
						<span>
							<img src="/images/success-top.svg" alt="video icon" width="25px" height="25px" />
						</span>
						Wöchentliches Code Review & Feedback
					</li>
					<li>
						<span>
							<img src="/images/success-top.svg" alt="video icon" width="25px" height="25px" />
						</span>
						Individueller Lehrplan & Übungsprojekte
					</li>
					<li>
						<span>
							<img src="/images/success-top.svg" alt="video icon" width="25px" height="25px" />
						</span>
						Job-Coaching & Bewerbungs-Training
					</li>
					<li>
						<span>
							<img src="/images/success-top.svg" alt="video icon" width="25px" height="25px" />
						</span>
						Lebenslanger Zugang zu Member Lektionen
					</li>
					<li>
						<span>
							<img src="/images/success-top.svg" alt="video icon" width="25px" height="25px" />
						</span>
						In Raten zahlbar über PayPal
					</li>
				</ul>

				<button
					class="button"
					on:click={() => {
						if (session) {
							goto(`/api/stripe/checkout?id=price_1PCHH3EfXwNEcc6mhVKLPpk6`);
						} else {
							goto('/registrieren');
						}
					}}
				>
					JETZT AUSBILDUNG STARTEN
				</button>
				<br />
			</price-card>
		</price-section>

		<payment-box>
			<slogan-box>
				<ShieldCheck strokeWidth={1.5} class="icon" />
				<p>Gesicherte AES-256-verschlüsselte Zahlungen mit Stripe:</p>
			</slogan-box>

			<payment-icons aria-labelledby="Bezahlmöglichkeiten">
				<!-- 	<img src="/images/stripe.svg" width="50px" height="50px" alt="stripe payment icon" /> -->
				<img src="/images/paypal.svg" width="50px" height="50px" alt="PayPal" />
				<img src="/images/stripe.svg" width="50px" height="50px" alt="Stripe" />
				<img src="/images/klarna.svg" width="50px" height="50px" alt="Klarna" />

				<img src="/images/mastercard.svg" width="50px" height="50px" alt="Mastercard Kreditkarte" />

				<img src="/images/visa.svg" width="50px" height="50px" alt="Visa Kreditkarte" />
			</payment-icons>
		</payment-box>

		<accordion-section>
			<background-triangle1 class="rotate"></background-triangle1>
			<background-triangle2 class="rotate"></background-triangle2>
			<background-triangle3 class="rotate"></background-triangle3>

			<top-slogan>
				<p>Praktisch orientiert</p>
				<h2>Was du lernen wirst</h2>
			</top-slogan>

			<Accordion open={true}>
				<h2 slot="head">
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Modul 1 -
					HTML & CSS <span>(3 Wochen)</span>
				</h2>
				<p slot="details">
					In Modul 1 wirst du die Basics von HTML & CSS erlernen und zwar gemeinsam, nicht getrennt!
					Denn das macht absolut keinen Sinn und wäre so, als würdest du bei einem Hamburger zuerst
					das Brötchen, dann das Fleisch essen. Außerdem wirst du von Anfang an einen GitHub Account
					bespielen und deinen Code versionieren. Das ist essentiell wichtig für einen Webentwickler
					/ bzw. Programmierer und wird deinen potentiellen Arbeitgebern zeigen, dass du ein Tool
					nutzen kannst, das in jedem Unternehmen eingesetzt wird.
				</p>
			</Accordion>
			<Accordion>
				<h2 slot="head">
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Modul 2 -
					Vanilla JavaScript <span>(8 Wochen)</span>
				</h2>
				<p slot="details">
					In Modul 2 wirst du die fundamentalen Basics von JavaScript erlernen. Keine Sorge, Du
					brauchst keine Mathematik! JavaScript ist perfekt für den Einstieg in die Programmierung,
					denn für Websites braucht man in den meisten Fällen keine Algorhitmen. Lerne spielend mit
					Code zumzugehen und zu denken wie ein Entwickler. JavaScript ist dafür perfekt geeignet.
				</p>
			</Accordion>
			<Accordion>
				<h2 slot="head">
					<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Modul 3 -
					Bewerbung & Jobinterview <span>(1 Woche)</span>
				</h2>
				<p slot="details">
					In Modul 3 wirst du lernen worauf es heutzutage bei einer Bewerbung ankommt. Ich zeige
					dir, wie du deinen Lebenslauf strukturierst, so dass du Personaler und Fachabteilungen von
					dir überzeugst. Wir werden außerdem ein Jobinterview durchspielen, das dich darauf
					vorbereiten wird, was tatsächlich auch so im echten Leben passiert.
				</p>
			</Accordion>

			<top-slogan>
				<p>Zielgruppe</p>
				<h2>Für wen ist es geeignet?</h2>
			</top-slogan>

			<ul>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Absolute
						Beginner bzw. Quereinsteiger ohne Vorerfahrung und solche die Entwickler bzw. Programmierer
						werden wollen.
					</span>
				</li>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Studenten,
						die während oder nach ihres Studiums festgetellt haben, sie möchten in eine andere berufliche
						Richtung gehen.
					</span>
				</li>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Alle, die
						schon mal an einem Bootcamp, VHS-Kurs oder einer Weiterbildungsmaßnahme vom Arbeitsamt teilgenommen
						haben, dort gescheitert sind, und sich immer eine individuelle Betreuung gewünscht haben.
					</span>
				</li>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Menschen
						die sich eine neue Jobperspektive aufbauen möchten und schon immer den Wunsch hatten, in
						der IT tätig zu sein bzw. das Programmieren zu erlernen.
					</span>
				</li>
				<li>
					<span>
						<img src="/images/success.svg" alt="Success Icon" width="25px" height="25px" /> Jeder, der
						neugierig auf Programmierung ist und die Welt der modernen Softwareentwicklung erkunden möchte.
					</span>
				</li>
			</ul>
		</accordion-section>
	</page-wrapper>
</MainLayout>

<style>
	page-wrapper,
	top-slogan {
		width: 70%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		@media (width < 451px) {
			width: 95%;
		}
	}

	page-wrapper {
		margin-bottom: 2rem;
	}

	p {
		color: var(--textAccent);
	}

	[slot='head'] {
		margin-top: 1rem;
		& span {
			font-size: 0.8rem;
			color: var(--textAccent);
		}
	}

	[slot='details'] {
		margin-bottom: 2rem;
	}

	top-slogan {
		padding: 2rem 0;
		text-align: center;

		& p {
			margin: 1rem 0;
		}
	}

	h2 {
		margin: 0.5rem 0;
	}

	payment-box {
		margin: 1rem 0;
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

	price-section {
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
	}

	price-card {
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
			background: radial-gradient(ellipse farthest-side at right center, #5170fe 0%, #ff0066 100%);
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

	accordion-section {
		position: relative;

		& top-slogan p {
			color: var(--tertColor);
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

		& background-triangle1 {
			/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
			left: -10rem;
			top: 20rem;
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
			right: -3rem;
			bottom: 10rem;
			opacity: 30%;

			@media (width < 451px) {
				display: none;
			}
		}
	}
</style>
