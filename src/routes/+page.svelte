<script lang="ts">
	import { goto } from '$app/navigation';
	import MainLayout from '../layouts/MainLayout.svelte';
	import type { PageData } from './$types';
	import './page.css';

	export let data: PageData;
	let video: HTMLVideoElement;

	function playVideo() {
		video.controls = true;
		video.style.borderRadius = '20px';
	}
</script>

<MainLayout
	title="Programmieren lernen - Dein Coding Mentor"
	description="Job wechseln? Du bist Quereinsteiger? Hier lernst Du das Programmieren. Ich biete Dir hier die Möglichkeit, Webentwicklung zu erlernen. HTML, CSS und JavaScript in 3 Monaten? Das ist möglich! Egal, ob Du ein Anfänger bist oder bereits Erfahrung hast, meine Videos werden Dir helfen, Deine Programmierkenntnisse auf das nächste Level zu bringen."
	imageUrl="https://www.programmieren-lernen.rocks/images/social-share-web-image.jpg"
>
	<hero-wrapper>
		<hero-section>
			<left-side>
				<h1>
					Programmieren lernen mit <span> praxisnahen Aufgaben.</span>
				</h1>
				<p>
					Erlerne Webentwicklung mit wöchentlichen Coding Aufgaben, die ein Programmierer täglich
					genauso umsetzt. Jede Lektion mit
					<b class="highlight">KOSTENKOSEM ZUGANG</b>
					zu den Basis Informationen.
				</p>
				<a href="/lektionen"><button>JETZT LOSLEGEN</button></a>
			</left-side>

			<right-side>
				<video on:click={playVideo} bind:this={video} poster="/poster.webp" preload="auto">
					<track kind="captions" />
					<source src="https://pojiieknawzlfigebtsk.supabase.co/storage/v1/object/public/videos/trailer.mp4?t=2024-05-03T09%3A43%3A14.222Z" type="video/mp4" />
				</video>
			</right-side>
		</hero-section>
	</hero-wrapper>

	<tech-grid-wrapper>
		<top-section>
			<h2>
				Erlene die essentiellen <span class="highlight">GRUNDLAGEN</span> des Web.
			</h2>
		</top-section>
		<tech-grid>
			<grid-item>
				<section>
					<picture>
						<img
							src="/images/html5.svg"
							loading="lazy"
							width="75px"
							height="75px"
							alt="Html 5 Logo"
						/>
					</picture>
					<h3>HTML</h3>
					<p>
						Erlerne die aktuellste Syntax und schreibe Html Code wie ein Profi. Du kannst mir
						glauben, es gibt nur sehr wenige Entwickler da draußen, die semantisch korrektes und
						leicht leserliches sowie verständliches HTML schreiben. Heb dich ab, mit Leichtigkeit!
					</p>
				</section>
			</grid-item>

			<grid-item>
				<section>
					<picture>
						<img
							src="/images/css.svg"
							loading="lazy"
							width="75px"
							height="75px"
							alt="Html 5 Logo"
						/>
					</picture>
					<h3>CSS</h3>
					<p>
						CSS hat sich in den letzten Jahren schon fast zu einer Programmier-sprache entwickelt.
						Auch hier ist es heutzutage ziemlich einfach sich von anderen Entwicklern abzuheben.
						Nesting, Variablen, Funktionen, das alles macht CSS zu einem sehr mächtigen Werkzeug.
					</p>
				</section>
			</grid-item>
			<grid-item>
				<section>
					<picture>
						<img
							src="/images/javascript.svg"
							loading="lazy"
							width="75px"
							height="75px"
							alt="Html 5 Logo"
						/>
					</picture>
					<h3>JavaScript</h3>
					<p>
						Neben HTML & CSS ist JavaScript <b>DIE PROGRAMMIERSPRACHE</b> des Web. Hast du diese drei
						fundamentalen Programmier-Basics verinnerlicht, kannst du von hier aus in alle Richtungen
						gehen. Egal ob Data-Science, KI-Entwicklung, Games, Mobile Apps usw. usw.
					</p>
				</section>
			</grid-item>
		</tech-grid>
	</tech-grid-wrapper>

	<info-wrapper>
		<info-section>
			<left-side>
				<background-triangle1 class="rotate"></background-triangle1>
				<background-triangle2 class="rotate"></background-triangle2>
				<background-triangle3 class="rotate"></background-triangle3>
				<img
					src="/images/web-development-service.svg"
					loading="lazy"
					width="550"
					height="550"
					alt="Web Entwicklung Illustration"
					srcset="
   					../../images/web-development-service.svg 550w"
					sizes="(max-width: 480px) 100vw, 550px"
				/>
			</left-side>
			<right-side>
				<h2>Web Entwicklung einfach gemacht.</h2>
				<p>
					Wähle zwischen einer Reihe von einsteigerfreundlichen Selbstlerner-Pfaden oder dem
					<a href="/aufbaukurs">Einsteiger Intensiv-Aufbaukurs</a>, der von mir entwickelt und durch
					meine Dozententätigkeit gestützt wird.
					<b> Lerne die Basics der Fronend-Entwicklung in 3 MONATEN</b>, erfahre, wie man
					Benutzeroberflächen (UI's) erstellt, und beherrsche HTML, CSS & JavaScript wie ein Profi.
					<span class="highlight">1 x pro Woche persönlicher Unterricht (2h) inklusive!</span>
				</p>
				<h3>Persönliches Coaching & Discord Community.</h3>
				<p>
					Im Selbstlernerpfad kannst du zusätzlich ein Einzelcoaching bzw. Code Review buchen.
					Außerdem hast du die Möglichkeit der Discord Community beizutreten und dich mit anderen
					Anfängern auszutauschen. Das Beste: Ich war freiberuflicher Dozent für Frontend
					Weiterbildungen und stehe Dir immer gerne zur Seite bei Fragen.<br />
				</p>
				<button>JETZT AUFBAUKURS BUCHEN</button>
			</right-side>
		</info-section>
	</info-wrapper>

	<latest-eps-wrapper>
		<h2>Akuelle Lerninhalte für <span class="highlight">DEINEN</span> Fortschritt</h2>
		<latest-eps-grid>
			{#await data.latestEpisodes then latestEpisodes}
				{#each latestEpisodes as episode}
					<episode-item on:click={() => goto(`/lektionen/ep-${episode.ep}`)}>
						<img src={episode.img} alt={`Lektionen Bild EP-${episode.ep}`} />
						<div>
							<h3>{episode.title}</h3>
							<p>{episode.description}</p>
						</div>
					</episode-item>
				{/each}
			{/await}
		</latest-eps-grid>
	</latest-eps-wrapper>

	<faq-wrapper>
		<top-section>
			<h2>Häufig gestellte Programmier <span class="highlight">FRAGEN</span> ? ? ?</h2>
		</top-section>
		<faq-section>
			<section>
				<img src="/images/remote.svg" loading="lazy" width="75px" height="75px" alt="Remote Icon" />
				<h3>Kann man sich Programmieren <br />selbst beibringen?</h3>
				<p>
					Eine berechtigte Frage. Die Antwort ist "Jein". Sich selbst das Programmieren beibringen
					ist ohne einen erfahrenen Mentor sehr schwierig. Das Problem ist, dass du als Einsteiger
					bzw. Anfänger nicht abschätzen kannst, ob der Content den du konsumierst geeignet ist in
					Sachen Aktualität, Expertise sowie Qualität.
				</p>
			</section>
			<section>
				<img
					src="/images/gamification.svg"
					loading="lazy"
					width="75px"
					height="75px"
					alt="Gamification Icon"
				/>
				<h3>
					Wie lange dauert es <br />
					Programmieren zu lernen?
				</h3>
				<p>
					Das hängt ganz von dir selbst ab. Jeder Mensch ist individuell in seinen koginitiven
					Fähigkeiten. Du solltest aber davon ausgehen, dass du je nach deiner Verfügbaren Zeit und
					Lerngeschwindigkeit, auf jeden Fall 6 Monate benötigst, um ein gewisses Grundverständnis
					zu erlangen und die Basics verinnerlicht zu haben.
				</p>
			</section>
			<section>
				<img src="/images/coding.svg" loading="lazy" width="75px" height="75px" alt="Coding Icon" />
				<h3>
					Wie schwer ist es <br />
					zu Programmieren?
				</h3>
				<p>
					Grundsätzlich kann man die Frage so beantworten. Sobald du die Basics verstanden hast und
					anwenden kannst, ist Programmieren nicht schwer. Es ist anfangs relativ schwer, zu
					verstehen, wie ein Programmierer denkt. Das ist aber einfach zu erlernen. Der Rest ist
					wirklich nur fleiß und eine gewisse Routine.
				</p>
			</section>
		</faq-section>

		<faq-section>
			<section>
				<img
					src="/images/challenges.svg"
					loading="lazy"
					width="75px"
					height="75px"
					alt="Challenges Icon"
				/>
				<h3>
					Kann ich in 3 Monaten <br />
					Programmieren lernen?
				</h3>
				<p>
					Nein. Bitte lass dir das von keinem Marketing Versprechen einreden. Als Dozent weiß ich
					ganz genau, dass das geradezu unmöglich ist. Das Tech Zeitalter ist über Dekaden gewachsen
					und egal ob HTML, CSS oder eine sonstige Programmiersprache, die Inhalte sind wirklich
					umfangreich.
				</p>
			</section>
			<section>
				<img
					src="/images/coaching.svg"
					loading="lazy"
					width="75px"
					height="75px"
					alt="Coaching Icon"
				/>
				<h3>
					Kann man mit 30 noch<br />
					Programmieren lernen?
				</h3>
				<p>
					Ganz ehrlich, das Alter spielt keine Rolle. Ich habe Menschen das Programmieren
					beigebracht, die waren weit über 30 Jahre alt. Dieses Alter ist meist sogar bestens
					geeignet, da man sich nicht mehr so leicht von anderen Dingen ablenken lässt und auch im
					Privatleben eine gewisse Arbeitsroutine besteht.
				</p>
			</section>
			<section>
				<img
					src="/images/learning.svg"
					loading="lazy"
					width="75px"
					height="75px"
					alt="Learning Icon"
				/>
				<h3>
					Wie fange ich an <br />
					Programmieren zu lernen?
				</h3>
				<p>
					Am besten fängst Du mit einer Auszeichnungssprache wie HTML an. Der Einstieg fällt hier
					den meisten Menschen sehr leicht. Wichtig ist, dass du regelmäßig Code schreibst. Das geht
					am besten mit kleinen Coding Aufgaben an denen du Schritt für Schritt wächst und deine
					Kenntnisse erweiterst.
				</p>
			</section>
		</faq-section>
	</faq-wrapper>
</MainLayout>
