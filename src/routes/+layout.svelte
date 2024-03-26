<script lang="ts">
	import './global.css';

	import { invalidate, goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { CircleUserRound, LogOut } from 'lucide-svelte';
	import Tooltip from '$lib/utils/Tooltip.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import DropdownMenu from '$lib/utils/DropdownMenu.svelte';

	export let data: LayoutData;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	onMount(() => {
		injectSpeedInsights();
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => subscription.unsubscribe();
	});

	const logOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<Toaster />
<header>
	<header-wrapper>
		<left-side>
			<a href="/">
				<img
					src="../../images/logo-white.webp"
					loading="lazy"
					width="240px"
					height="80px"
					alt="Website Logo"
					srcset="
   					../../images/logo-white.webp 240w"
					sizes="(max-width: 480px) 100vw, 240px"
				/>
			</a>
		</left-side>
		<right-side>
			<nav>
				<ul>
					<li>
						<a href="/lektionen"> Lektionen </a>
					</li>
					<li>
						<a href="/mitglied-werden"> Mitgliedschaft </a>
					</li>
					<li>
						<Tooltip tooltip="Konto">
							<button aria-label="Go to Account" on:click={() => goto('/account')}
								><CircleUserRound size={30} strokeWidth={1.2} style="cursor: pointer" />
							</button>
						</Tooltip>
					</li>
					{#if session}
						<li>
							<form action="/logout" method="POST">
								<Tooltip tooltip="Logout">
									<button aria-label="Logout" class="logout" type="submit"
										><LogOut size={20} /></button
									>
								</Tooltip>
							</form>
						</li>
					{/if}
				</ul>
			</nav>
			<DropdownMenu data={session} />
		</right-side>
	</header-wrapper>
</header>

<main>
	<slot />
</main>

<footer>
	<footer-wrapper>
		<!-- <top-footer>
            <left-side>
                <section>
                    <h3>Hol dir den Newsletter!</h3>
                    <p>
                        Verpasse Keine Lektion mehr verpassen und von Angeboten
                        <span class="underline">profitieren</span>.
                    </p>
                </section>
            </left-side>

            <right-side>
                <input type="email" name="" id="" placeholder="E-Mail Adresse eingeben" />
                <img
                    src="../../images/send.svg"
                    width="50px"
                    height="50px"
                    loading="lazy"
                    alt="Senden Button Icosn"
                />
            </right-side>
        </top-footer> -->
		<mid-footer>
			<left-column-1>
				<p><b>Informationen</b></p>
				<ul>
					<li><a href="/impressum">Impressum</a></li>
					<li><a href="/datenschutz">Datenschutz</a></li>
					<!-- <li><a href="/agb">Geschäftsbedingungen</a></li> -->
				</ul>
			</left-column-1>

			<left-column-2>
				<p><b>Site Links</b></p>
				<ul>
					<li><a href="/lektionen">Lektionen</a></li>
					<li><Tooltip tooltip="Bald!">Coding Blog</Tooltip></li>
				</ul>
			</left-column-2>

			<mid-column>
				<background-triangle1 class="rotate"></background-triangle1>
				<background-triangle2 class="rotate"></background-triangle2>
				<background-triangle3 class="rotate"></background-triangle3>
				<p><b>Folge mir</b></p>
				<ul>
					<li>
						<a
							href="https://www.youtube.com/channel/UChpTG75PFHDO9NHlK8rV1og"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="../../images/youtube.svg"
								loading="lazy"
								width="40px"
								height="40px"
								alt="YouTube Icon"
							/>
						</a>
					</li>
					<li>
						<a href="https://github.com/tobseyltd/" target="_blank" rel="noopener noreferrer">
							<img
								src="../../images/github.svg"
								loading="lazy"
								width="40px"
								height="40px"
								alt="GitHub Icon"
							/>
						</a>
					</li>
					<li>
						<a
							href="https://discord.com/channels/1207608743588663306/1207608744264081449"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="../../images/discord.svg"
								loading="lazy"
								width="40px"
								height="40px"
								alt="Discord Icon"
							/>
						</a>
					</li>
					<li>
						<a
							href="https://open.spotify.com/user/slipdub?si=d0a1db7788ce482b"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="../../images/spotify.svg"
								loading="lazy"
								width="40px"
								height="40px"
								alt="Spotify Icon"
							/>
						</a>
					</li>
				</ul>
				<a href="https://www.codewars.com/users/tobsey/" target="_blank" rel="noopener noreferrer">
					<img
						src="https://www.codewars.com/users/tobsey/badges/small"
						alt="codewars banner"
						loading="lazy"
						width="300px"
						height="20px"
					/>
				</a>
			</mid-column>

			<right-column-1>
				<p class=""><b>Über mich</b></p>
				<ul>
					<li><Tooltip tooltip="Bald!">Dozententätigkeit</Tooltip></li>
					<li><Tooltip tooltip="Bald!">Web Entwickler</Tooltip></li>

					<li></li>
					<li></li>
				</ul>
			</right-column-1>
			<right-column-2>
				<p><b>Shopping</b></p>
				<ul>
					<li><Tooltip tooltip="Bald!">Online Shop</Tooltip></li>

					<li><Tooltip tooltip="Bald!">Coaching</Tooltip></li>
				<!-- 	<li>
						<a
							href="https://bergemann-hoehne.com/wp-content/uploads/2023/10/Flyer-FullStack-w.pdf"
							target="_blank"
							rel="noopener noreferrer"
							>Informationen
						</a>
					</li> -->
					<li></li>
					<li></li>
				</ul>
			</right-column-2>
		</mid-footer>
		<bottom-footer>
			<left-side
				><span>
					<img
						src="../../images/copyright.svg"
						alt=""
						loading="lazy"
						width="20"
						height="20"
					/></span
				>
				2024 programmieren-lernen.rocks
			</left-side>
			<right-side>
				Made with
				<span><img src="../../images/love.svg" loading="lazy" width="35" height="35" alt="" /></span
				>
				with Svelte & Supabase
			</right-side>
		</bottom-footer>
	</footer-wrapper>
</footer>

<style>
	header {
		& header-wrapper {
			container-type: inline-size;
			height: 8cqh;
			margin: 0 auto;
			display: flex;
			position: relative;

			& left-side {
				width: 50%;
				display: flex;
				align-items: center;
				text-align: start;

				& a {
					& img {
						width: 35%;
						height: auto;

						@media (width < 451px) {
							width: 100%;
							height: auto;
						}
						@media (width > 450px) and (width < 1025px) {
							width: 50%;
							height: auto;
						}
					}
				}
			}

			& right-side {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: end;

				& nav {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: end;
					gap: 2rem;

					@media (width < 769px) {
						display: none;
					}

					& ul {
						display: inline-flex;
						align-items: center;
						gap: 1.5rem;

						& li {
							margin: 0;

							& a {
								text-decoration: none;
								color: white;
							}

							& [data-tooltip]:before {
								bottom: -120%;
								left: 50%;
								margin-bottom: 5px;
							}

							& [data-tooltip]:after {
								display: none;
							}

							& span {
								display: inline-block;
								margin-top: 7px;
							}

							& button {
								padding: 0.3rem 0.5rem;
								margin-top: -0.1rem;

								&:not(.logout) {
									background-color: transparent;
									border: none;
									padding: 0.3rem 0rem;
									margin-top: -0.2rem;
								}
							}
						}
					}
				}
			}
		}
	}

	main {
		margin: 0 auto;
	}

	footer {
		& footer-wrapper {
			display: block;
			margin: 0 auto;

			& top-footer {
				border-top: 1px solid var(--blueAccent);
				padding: 2rem 0;
				display: flex;
				margin: 0 auto;
				position: relative;
				display: flex;
				gap: 1rem;

				@media (width < 769px) {
					flex-direction: column;
				}

				& left-side {
					text-align: left;
					width: 60%;

					@media (width < 769px) {
						width: 100%;
					}

					& section {
						& h4 {
							margin-bottom: 0.1rem;
						}

						& p {
							color: var(--textAccent);
						}
					}
				}

				& right-side {
					width: 40%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 1rem;
					text-align: left;

					@media (width < 769px) {
						width: 100%;
					}

					& section {
						& h4 {
							margin-bottom: 0.1rem;
						}
					}

					& img {
						position: absolute;
						width: 3%;
						right: 1rem;

						@media (width < 769px) {
							width: 10%;
						}
					}

					& ul {
						list-style: none;
					}

					& input {
						background-color: transparent;
						border: none;
						border-bottom: 1px solid white;
						border-radius: 10px;
						padding: 0.6rem;
						/* margin-left: -2.5rem; */
						width: 100%;
						color: white;
						font-size: 0.7rem;

						&:focus-visible {
							outline: none;
						}

						&::placeholder {
							color: white;
							font-size: 0.7rem;
							font-family: 'League Spartan', sans-serif;
						}
					}
				}
			}
			& mid-footer {
				display: flex;
				gap: 1rem;
				justify-content: space-between;
				margin: 0 auto;
				text-align: start;
				padding: 3rem 0;
				border-top: 1px solid var(--blueAccent);
				width: 100%;

				@media (width < 769px) {
					text-align: center;
					flex-wrap: wrap;
					gap: 0;

					& :nth-child(3) {
						order: 4;
					}
				}

				& h4 {
					text-transform: capitalize;
				}

				& p {
					margin-bottom: 1rem;
					text-transform: capitalize;
					/* text-decoration: underline; */
				}

				& ul li {
					font-size: 0.8rem;
					color: var(--textAccent);

					& a {
						color: var(--textAccent);
					}

					& [data-tooltip]:before {
						bottom: -110%;
						left: 50%;
						margin-bottom: 5px;
					}

					& [data-tooltip]:after {
						position: absolute;
						top: 80%;
						left: 50%;
					}
				}

				& left-column-1,
				left-column-2 {
					@media (width < 769px) {
						width: 50%;
					}
				}

				& mid-column {
					position: relative;
					text-align: center;

					@media (width < 769px) {
						width: 100%;
						text-align: center;
						margin-top: 2rem;

						& p {
							display: none;
						}
					}

					& ul {
						display: flex;
						gap: 1rem;
						justify-content: center;
					}

					& background-triangle1 {
						/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
						right: 17rem;
						top: 1rem;
						opacity: 20%;

						@media (width < 769px) {
							display: none;
						}
					}

					& background-triangle2 {
						/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
						right: 30rem;
						top: 3.5rem;
						opacity: 20%;

						@media (width < 769px) {
							display: none;
						}
					}
					& background-triangle3 {
						/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
						right: 14rem;
						top: 3rem;
						opacity: 30%;

						@media (width < 769px) {
							display: none;
						}
					}
				}
				& [alt='codewars banner'] {
					margin-top: 1rem;
					width: 100%;
				}

				& right-column-1,
				right-column-2 {
					@media (width < 769px) {
						margin-top: 2rem;
						width: 50%;
					}
				}
			}

			& bottom-footer {
				border-top: 1px solid var(--blueAccent);
				padding: 1rem 0;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				font-size: 0.7rem;

				@media (width < 769px) {
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				& left-side {
					display: flex;
					align-items: center;
					gap: 0.4rem;

					& span {
						display: flex;
						align-items: center;
					}
				}

				& right-side {
					display: flex;
					align-items: center;

					& span {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}

	main,
	footer-wrapper,
	header-wrapper {
		@media (width < 451px) {
			width: 90%;
		}

		@media (width > 450px) {
			width: 80%;
		}

		@media (width > 768px) {
			width: 90%;
		}

		@media (width > 1440px) {
			width: 70%;
		}

		@media (width > 1920px) {
			width: 55%;
		}
	}
</style>
