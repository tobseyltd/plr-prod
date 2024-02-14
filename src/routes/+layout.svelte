<script lang="ts">
	import './global.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { BadgeCheck, BookOpenCheck, CircleUserRound, LogOut } from 'lucide-svelte';
	import Tooltip from '$lib/utils/Tooltip.svelte';
	import { Toaster } from 'svelte-french-toast';

	export let data: LayoutData;

	let { session, supabase } = data;
	$: ({ session, supabase } = data);

	onMount(() => {
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

<svelte:head>
	<title>Programmieren lernen</title>
</svelte:head>

<Toaster />
<header>
	<header-wrapper>
		<left-side>
			<a href="/">
				<img
					src="../../images/logo-white.webp"
					loading="lazy"
					width="240"
					height="80"
					alt="Website Logo"
				/>
			</a>
		</left-side>
		<right-side>
			<nav>
				<ul>
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					<li>
						<a href="/lektionen">
							<Tooltip tooltip="Lektionen">
								<BookOpenCheck size={30} strokeWidth={1.2} />
							</Tooltip>
						</a>
					</li>

					<li>
						<a href="/mitglied-werden">
							<Tooltip tooltip="Mitgliedschaft">
								<BadgeCheck size={30} strokeWidth={1.2} />
							</Tooltip>
						</a>
					</li>
					<li>
						<a href="/account">
							<Tooltip tooltip="Account">
								<CircleUserRound size={30} strokeWidth={1.2} />
							</Tooltip>
						</a>
					</li>
					{#if session}
						<li>
							<form action="/logout" method="POST">
								<Tooltip tooltip="Logout">
									<button type="submit"><LogOut size={20} /></button>
								</Tooltip>
							</form>
						</li>
					{/if}
				</ul>
			</nav>
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
			<left-side>
				<p><b>Informationen</b></p>
				<ul>
					<li>Impressum</li>
					<li>Datenschutz</li>
					<li>Geschäftsbedingungen</li>
					<li></li>
					<li></li>
				</ul>
			</left-side>
			<mid-section-1>
				<p><b>Site Links</b></p>
				<ul>
					<li>Lektionen</li>
					<li>Coding Blog</li>
					<li>Online Shop</li>
					<li></li>
					<li></li>
				</ul>
			</mid-section-1>
			<mid-section-2>
				<p class=""><b>Über mich</b></p>
				<ul>
					<li>Dozententätigkeit</li>
					<li>Web Entwickler</li>
					<li>YouTube</li>
					<li></li>
					<li></li>
				</ul>
			</mid-section-2>
			<mid-section-3>
				<p><b>Remote Kurs</b></p>
				<ul>
					<li>Teilnahme</li>
					<li>Bergemann & Höhne</li>
					<li>Informationen</li>
					<li></li>
					<li></li>
				</ul>
			</mid-section-3>
			<right-side>
				<background-triangle1 class="rotate"></background-triangle1>
				<background-triangle2 class="rotate"></background-triangle2>
				<background-triangle3 class="rotate"></background-triangle3>
				<p><b>Folge mir</b></p>
				<ul>
					<li>
						<img
							src="../../images/youtube.svg"
							loading="lazy"
							width="40px"
							height="40px"
							alt="YouTube Icon"
						/>
					</li>
					<li>
						<img
							src="../../images/github.svg"
							loading="lazy"
							width="40px"
							height="40px"
							alt="GitHub Icon"
						/>
					</li>
					<li>
						<img
							src="../../images/discord.svg"
							loading="lazy"
							width="40px"
							height="40px"
							alt="Discord Icon"
						/>
					</li>
					<li>
						<img
							src="../../images/spotify.svg"
							loading="lazy"
							width="40px"
							height="40px"
							alt="Spotify Icon"
						/>
					</li>
					<li></li>
				</ul>
				<img
					src="https://www.codewars.com/users/tobsey/badges/small"
					alt="codewars banner"
					width="300px"
					height="20px"
				/>
			</right-side>
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
				2023 programmieren-lernen.rocks
			</left-side>
			<right-side>
				Made with
				<span><img src="../../images/love.svg" loading="lazy" width="35" height="35" alt="" /></span
				>
				in HTML, CSS & Vanilla JS
			</right-side>
		</bottom-footer>
	</footer-wrapper>
</footer>

<style>
	header {
		& header-wrapper {
			container-type: inline-size;
			width: var(--wrapperWidth);
			height: 8cqh;
			margin: 0 auto;
			display: flex;

			@media (width < 450px) {
				width: 95%;
			}

			& left-side {
				width: 50%;
				display: flex;
				align-items: center;
				text-align: start;

				& a {
					& img {
						@media (width < 400px) {
							width: 100%;
							height: auto;
						}
					}
				}
			}

			& right-side {
				width: 50%;
				display: flex;
				align-items: center;

				& nav {
					width: 100%;
					display: flex;
					align-items: center;
					gap: 2rem;
					justify-content: end;

					& ul {
						display: flex;
						align-items: center;
						gap: 1.5rem;

						& li {
							position: relative;
							margin-top: 0.2rem;

							& a {
								display: flex;
								align-items: center;
								text-decoration: none;
								color: white;
							}

							& button {
								padding: 0.3rem 0.5rem;
								margin-bottom: 8px;
							}
						}
					}
				}

				& a > iconify-icon {
					color: white;
					display: block;
				}
			}
		}
	}
</style>
