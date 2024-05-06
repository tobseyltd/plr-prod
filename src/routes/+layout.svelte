<script lang="ts">
	import './global.css';
	import './layout.css';
	import { invalidate, goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { LogOut } from 'lucide-svelte';
	import Tooltip from '$lib/utils/Tooltip.svelte';
	import { Toaster } from 'svelte-french-toast';
	import DropdownMenu from '$lib/utils/DropdownMenu.svelte';

	export let data: LayoutData;

	let logo: HTMLImageElement;
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

	function handleLogoHover() {
		logo.src = '/rocket.gif';
		logo.width = 150;
		logo.srcset = '/rocket.gif 150w';
		logo.sizes = '(max-width: 480px) 100vw, 150px';
		logo.className = '';
	}
	function handleLogoLeave() {
		logo.src = '/images/logo-white.png';
		logo.srcset = '/images/logo-white.png 180w';
		logo.sizes = '(max-width: 480px) 100vw, 180px';
		logo.width = 180;
	}
</script>

<Toaster />
<header>
	<header-wrapper>
		<left-side>
			<a href="/">
				<img
					on:mouseover={handleLogoHover}
					on:mouseleave={handleLogoLeave}
					bind:this={logo}
					src="/images/logo-white.png"
					loading="lazy"
					width="180px"
					height="auto"
					alt="Website Logo"
					title="Zur Startseite"
					srcset="
				/images/logo-white.png 180w"
					sizes="(max-width: 480px) 100vw, 180px"
				/>
			</a>
		</left-side>
		<right-side>
			<nav>
				<ul>
					<li class="pro">
						<a href="/mitglied-werden" title="Mitglied werden"> PRO </a>
					</li>
					<li>
						<a href="/lektionen" title="Jetzt lernen"> LEKTIONEN </a>
					</li>
					<li>
						<a href="/aufbaukurs" title="Für Einsteiger"> AUFBAUKURS </a>
					</li>
					<li>
						<a href="/account">
							{#if !session}
								LOGIN
							{:else}
								Account
							{/if}
						</a>
					</li>

					{#if session}
						<li>
							<form action="/logout" method="POST">
								<button aria-label="Logout" class="logout" type="submit" title="Ausloggen"
									><LogOut size={20} /></button
								>
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
