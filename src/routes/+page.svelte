<script lang="ts">
	import MainLayout from '../layouts/MainLayout.svelte';
</script>

<MainLayout title="Programmieren lernen - Dein Coding Mentor" description="" imageUrl="">
	<hero-wrapper>
		<hero-section>
			<left-side>
				<h1>Programmieren lernen mit praxisnahen Aufgaben.</h1>
				<p>
					Erlerne das Programmieren mit wöchentlichen Coding Aufgaben, die ein Programmierer täglich
					genauso umsetzt. Jede Lektion mit
					<span class="underline">kostenlosem Zugang</span>
					zu den Basis Informationen.
				</p>
				<a href="/lektionen"><button>Jetzt Loslegen</button></a>
			</left-side>

			<right-side>
				<img src="./images/home-top-img.webp" alt="Programmieren lernen Infobild, Coding Mentor und Programmiersprachen" width="auto" loading="lazy" />
			</right-side>
		</hero-section>
	</hero-wrapper>

	<tech-grid-wrapper>
		<top-section>
			<h2>Erlene die essentiellen <span class="underline">Grundlagen</span> des Web.</h2>
		</top-section>
		<tech-grid>
			<grid-item-1 class="style">
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
						leicht leserliches HTML schreiben. Heb dich ab, mit Leichtigkeit!
					</p>
				</section>
			</grid-item-1>

			<grid-item-2 class="style">
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
						CSS hat sich in den letzten Jahren schon fast zu einer Programmiersprache entwickelt.
						Auch hier ist es heutzutage ziemlich einfach sich von anderen Entwicklern abzuheben.
						Nesting, Variablen, Funktionen, das alles macht CSS zu einem sehr mächtigen Werkzeug.
						Meistere es und du wirst zum gefragten Professional.
					</p>
				</section>
			</grid-item-2>
			<grid-item-3 class="style">
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
						Neben HTML & CSS ist JavaScript <b>DIE</b> Programmiersprache des Web. Hast du diese drei
						fundamentalen Sprachen verinnerlicht, kannst du alles im Web erstellen, was du dir vorstellen
						kannst. Vor allem JavaScript wird von vielen Entwicklern stiefmütterlich behandelt. Das ist
						fatal! Denn Frameworks sind zwar schön und gut, doch in den meisten Fällen wird gar keines
						benötigt!
					</p>
				</section>
			</grid-item-3>
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
					width="100%"
					alt="Web Entwicklung Illustration"
				/>
			</left-side>
			<right-side>
				<h2>Web Entwicklung <span>einfach</span> gemacht.</h2>
				<p>
					Wähle zwischen einer Reihe von einsteigerfreundlichen Lernpfaden, die von mir entwickelt
					und durch meine Dozententätigkeit gestützt werden. Lerne die Basics der Fronend- und
					Backend-Entwicklung, erfahre, wie man Benutzeroberflächen (UI's) erstellt, und beherrsche
					die Programmiersprachen und Frameworks, die das moderne Web antreiben.
				</p>
				<h3>Persönliches Coaching & Remote Kurs.</h3>
				<p>
					Du kannst außerdem ein Einzelcoaching bzw. Code Review buchen. Zusätzlich hast du die
					Möglichkeit an einem Fullstack Developer Kurs teilzunehmen, der über 12 Monate geht, und
					alle Aspekte der Web Entwicklung abdeckt. Das Beste: Ich bin dort Dozent und der Kurs kann
					sowohl über einen Bildungsgutschein finanziert werden als auch über eine Finanzierung für
					Selbstzahler.
					<b><em>Sprich mich einfach an!</em></b>
				</p>
				<button>Ich will mehr wissen</button>
			</right-side>
		</info-section>
	</info-wrapper>

	<faq-wrapper>
		<top-section>
			<h2>Häufig gestellte Programmier <span class="underline">Fragen</span> ? ? ?</h2>
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

	<action-call-wrapper>
		<action-call>
			<left-side>
				<h2>
					Starte <span>jetzt</span> dein Coding Abenteuer und werde ein gefragter Fullstack Web Entwickler.
				</h2>
				<a href="/lektionen">
					<button class="button">Jetzt Lernen</button>
				</a>
			</left-side>

			<right-side>
				<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#FF0066"
						d="M63.6,-23.1C69.7,-1.8,53.2,24.4,30,41.2C6.8,58,-23.1,65.5,-44.4,52.1C-65.7,38.7,-78.5,4.5,-69.7,-20.5C-60.9,-45.5,-30.4,-61.3,-0.9,-61C28.7,-60.7,57.4,-44.4,63.6,-23.1Z"
						transform="translate(100 100)"
					/>
				</svg>
				<img src="/images/man-launching-startup-blue.webp" loading="lazy" width="100%" alt="" />
				<background-triangle1 class="rotate"></background-triangle1>
				<background-triangle2 class="rotate"></background-triangle2>
				<background-triangle3 class="rotate"></background-triangle3>
			</right-side>
		</action-call>
	</action-call-wrapper>
</MainLayout>

<style>
	hero-wrapper {
		container-type: inline-size;
		margin: 3rem 0;
		padding-bottom: 2rem;
		width: 100%;
		display: block;

		& hero-section {
			container-type: inline-size;

			@media (width < 451px) {
				width: 94%;
				flex-direction: column-reverse;
				gap: 2rem;
			}

			width: var(--wrapperWidth);
			display: flex;
			margin: 0 auto;
			background-position: top left;

			& left-side {
				width: 35%;
				position: relative;
				display: flex;
				flex-direction: column;
				gap: 1rem;
				align-self: center;
				margin-right: 10%;

				@media (width <451px) {
					width: 90%;
				}

				& h1 {
					@media (width <451px) {
						font-size: 1.5rem;
						line-height: 1.6rem;
					}
				}

				& p {
					width: 40ch;
					line-height: 1.2rem;
					color: var(--textAccent);

					@media (width <451px) {
						width: 100%;
					}
				}

				& button {
					width: 40%;
				}

				& a {
					text-decoration: none;
				}
			}

			& right-side {
				@media (width <451px) {
					margin: 0;
				}

				& img {
					width: 100%;
					height: auto;
				}
			}
		}
	}

	tech-grid-wrapper {
		display: block;
		margin: 0 auto;

		@media (width <451px) {
			width: 94%;
		}

		& top-section {
			display: flex;
			justify-content: center;
			margin: 0 auto;
			width: var(--wrapperWidth);

			@media (width < 451px) {
				width: 90%;
			}
		}

		& tech-grid {
			container-type: inline-size;
			width: var(--wrapperWidth);
			padding: 2rem 0;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1rem;
			margin: 0 auto;
			position: relative;

			@media (width < 451px) {
				width: 94%;
				grid-template-columns: 1fr;
				padding-bottom: 0;
			}

			& .style {
				border: 3px solid rgba(128, 128, 128, 0.194);
				padding: 2rem;
				border-radius: 20px;
				text-align: center;
				background-color: #3536508b;

				& p {
					color: var(--textAccent);
				}

				& img {
					width: 20%;
				}
			}
			& background-triangle1 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				right: 0;
				bottom: 0;
				position: absolute;
				display: block;
				width: 40px;
				height: 40px;
				background: rgb(34, 193, 195);
				background: linear-gradient(130deg, rgb(34, 85, 195) 0%, rgb(45, 191, 253) 100%);
				opacity: 40%;
			}

			& background-triangle2 {
				/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
				right: 0;
				bottom: -3.5rem;
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
				right: 0;
				bottom: -5rem;
				position: absolute;
				display: block;
				width: 40px;
				height: 40px;
				background: rgb(62, 100, 132);
				background: linear-gradient(0deg, rgb(23, 52, 79) 0%, rgb(3, 52, 107) 100%);
				opacity: 40%;
			}
		}
	}

	info-wrapper {
		display: block;
		margin: 0 auto;

		@media (width <451px) {
			width: 94%;
		}

		& info-section {
			padding: 4rem 0;
			display: flex;
			margin: 0 auto;
			width: var(--wrapperWidth);
			position: relative;

			@media (width < 451px) {
				width: 90%;
				flex-direction: column-reverse;
				padding-top: 0;
				padding-bottom: 2rem;
			}

			& left-side {
				display: block;
				width: 50%;
				padding: 1rem 0;
				position: relative;

				@media (width < 451px) {
					width: 100%;
					text-align: center;
				}

				& img {
					width: 90%;
					transform: translatey(0px);
					animation: float-item-1 6s ease-in-out infinite;
				}

				& background-triangle1 {
					/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
					left: 2rem;
					position: absolute;
					display: block;
					width: 40px;
					height: 40px;
					background: rgb(34, 193, 195);
					background: linear-gradient(130deg, rgb(34, 85, 195) 0%, rgb(45, 191, 253) 100%);
					opacity: 40%;
				}

				& background-triangle2 {
					/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
					left: 0;
					bottom: 1.5rem;
					position: absolute;
					display: block;
					width: 40px;
					height: 40px;
					background: rgb(62, 100, 132);
					background: linear-gradient(0deg, rgb(34, 85, 195) 0%, rgb(3, 76, 107) 100%);
				}
				& background-triangle3 {
					/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
					left: 5rem;
					bottom: -2rem;
					position: absolute;
					display: block;
					width: 40px;
					height: 40px;
					background: rgb(62, 100, 132);
					background: linear-gradient(0deg, rgb(23, 52, 79) 0%, rgb(3, 52, 107) 100%);
				}
			}

			& right-side {
				width: 50%;
				height: 20%;
				margin-left: 10%;
				padding: 3rem 0;
				position: relative;

				@media (width < 451px) {
					width: 100%;
					margin: 0;
					text-align: center;
				}

				& h2 {
					margin-bottom: 1rem;
					& span {
						color: var(--secondColor);
						position: relative;

						&::after {
							content: '';
							position: absolute;
							bottom: -15px;
							left: 0;
							height: 7px;
							width: 100%;
							border: solid 4px var(--secondColor);
							border-color: var(--secondColor) transparent transparent transparent;
							border-radius: 70%;
						}
					}
				}

				& p {
					color: var(--textAccent);
				}

				& button {
					margin-top: 1rem;
				}

				& a {
					text-decoration: none;
				}
			}
		}
	}

	faq-wrapper {
		container-type: inline-size;
		padding: 4rem 0;
		text-align: center;
		display: block;
		position: relative;
		margin: 0 auto;

		@media (width <451px) {
			width: 94%;
		}

		& top-section {
			display: flex;
			justify-content: center;
			margin: 0 auto;
			width: var(--wrapperWidth);

			@media (width < 451px) {
				width: 90%;
				margin-bottom: 1rem;
			}
		}

		& faq-section {
			padding: 2rem 0;
			display: flex;
			gap: 2rem;
			margin: 0 auto;
			width: var(--wrapperWidth);
			position: relative;

			@media (width < 451px) {
				flex-direction: column;
				width: 90%;
			}

			& section {
				width: 33.33%;
				text-align: center;

				@media (width < 451px) {
					width: 100%;
				}

				& p {
					color: var(--textAccent);
				}

				& img {
					width: 15%;
					height: auto;
				}
			}
		}

		& background-triangle1 {
			/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
			right: 37rem;
			top: 5rem;
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
			left: 20rem;
			top: 25.5rem;
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
			right: 44rem;
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

	action-call-wrapper {
		display: block;
		margin: 3rem 0;

		& action-call {
			width: 50%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			background: rgb(81, 112, 254);
			background: linear-gradient(121deg, var(--violetBlue) 50%, rgba(255, 0, 102, 1) 100%);
			padding: 0 4rem;
			border-radius: 20px;
			box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
			border: 10px solid rgb(73, 66, 66);
			border-style: double;

			@media (width < 451px) {
				width: 90%;
				flex-direction: column;
				padding: 2rem 0;
			}

			& left-side {
				width: 70%;

				& h2 {
					width: 30ch;
					/* text-align: center; */
					text-shadow: 2px 2px #252746;
					line-height: 1.7rem;
					margin-bottom: 1rem;

					@media (width < 451px) {
						width: 100%;
					}

					& span {
						color: var(--secondColor);
						position: relative;

						&::after {
							content: '';
							position: absolute;
							bottom: -15px;
							left: 0;
							height: 7px;
							width: 100%;
							border: solid 4px var(--secondColor);
							border-color: var(--secondColor) transparent transparent transparent;
							border-radius: 70%;
						}
					}
				}

				& a {
					text-decoration: none;
				}
				& .button {
					width: 40%;

					@media (width < 451px) {
						width: 100%;
					}
				}
			}
			& right-side {
				width: 30%;
				background-color: var(--violetBlue);
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: relative;
				border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;

				@media (width < 451px) {
					display: none;
				}

				& svg {
					position: absolute;
					z-index: 0;
					opacity: 20%;
				}
				& img {
					z-index: 2;
					width: 100%;
					height: auto;
				}
				& background-triangle1 {
					/* border-radius: 30% 70% 70% 30% / 37% 30% 70% 63%; */
					right: 17rem;
					top: 5rem;
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
					right: 0;
					top: 2.5rem;
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
					right: 14rem;
					bottom: 3rem;
					position: absolute;
					display: block;
					width: 40px;
					height: 40px;
					background: rgb(62, 100, 132);
					background: linear-gradient(0deg, rgb(23, 52, 79) 0%, rgb(3, 52, 107) 100%);
					opacity: 30%;
				}
			}

			& button {
				background-color: var(--secondColor);
				width: 70%;
			}
		}
	}

	@keyframes float {
		0% {
			/* box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6); */
			transform: translatey(0px);
		}
		50% {
			/* box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2); */
			transform: translatey(-20px);
		}
		100% {
			/* box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6); */
			transform: translatey(0px);
		}
	}

	@keyframes float-item-1 {
		0% {
			transform: translatey(-10px);
		}
		50% {
			transform: translatey(15px);
		}
		100% {
			transform: translatey(-10px);
		}
	}
</style>
