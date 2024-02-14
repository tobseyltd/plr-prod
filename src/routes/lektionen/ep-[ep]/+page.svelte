<script lang="ts">
	import toast, { Toaster } from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '../../account/ZodSchema';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.tier, data.paymentStatus);

	const { form, errors, enhance } = superForm(data.loginForm, {
		validators: zodClient(loginSchema),
		resetForm: true,
		onResult: ({ result }) => {
			console.log(result);
			switch (result.type) {
				case 'redirect':
					toast.success('Success! Confirm your email to login.');
					break;
				case 'error':
					toast.error('Error creating your account!');
					break;
				case 'failure':
					toast.error('Check your details and try again!');
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<Toaster />
<detail-page-wrapper>
	<h1>EP-{data.lesson.ep} : {data.lesson.title}</h1>
	<detail-page-content>
		<left-side>
			<p></p>
			<h3>Part 1 - Free Coding Lektion</h3>
			<video-1>
				<iframe
					width="560"
					height="315"
					src=""
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</video-1>
			{#if (data.session && data.tier === 'ABO') || data.paymentStatus === 'paid'}
				<h3>Part 2 - Members Coding Lektion</h3>

				<video-2>
					<iframe
						width="560"
						height="315"
						src=""
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				</video-2>
			{:else if !data.session}
				<login-form>
					<p>Einloggen oder <a href="/mitglied-werden">Mitglied werden</a></p>
					<form method="POST">
						<input type="email" name="email" id="email" placeholder="E-Mail Adresse" />
						<input type="password" name="password" id="password" placeholder="Passwort" />
						<button type="submit">Einloggen</button>
					</form>
				</login-form>
			{/if}
		</left-side>
		<right-side>
			<h2>Files</h2>
		</right-side>
	</detail-page-content>
</detail-page-wrapper>

<style>
	detail-page-wrapper {
		display: block;
		width: var(--wrapperWidth);
		border-top: 1px solid #2d39db57;
		margin: 0 auto;
		padding: 2rem 0;

		& detail-page-content {
			margin-top: 1rem;
			margin-bottom: 2rem;
			display: flex;
			container-type: inline-size;

			& left-side {
				width: 80%;

				& video-1 {
					display: flex;
					& iframe {
						border-radius: 1rem;
					}

					& p {
						padding: 1rem 2rem;
					}
				}

				& h3 {
					padding-top: 2rem;
				}

				& login-form {
					float: left;

					& p {
						margin: 1rem 0;

						& a {
							color: var(--secondColor);
						}
					}

					& form {
						width: 100%;
						display: flex;
						gap: 0.5rem;
						margin: 0 auto;
						flex-direction: column;
						align-items: center;

						& > input {
							width: 350px;
							height: 50px;
							border-radius: 0.5rem;
							padding: 0 0.5rem;
							border: none;
							border-bottom: 3px solid var(--tertColor);
						}

						& button {
							width: 350px;
						}
					}
				}
			}

			& right-side {
				width: 20%;
			}
		}
	}
</style>
