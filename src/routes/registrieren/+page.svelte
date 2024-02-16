<script lang="ts">
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { registerUserSchema } from './ZodSchemas';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.registerForm, {
		validators: zodClient(registerUserSchema),
		resetForm: true,
		onResult: ({ result }) => {
			console.log(result);
			switch (result.type) {
				case 'success':
					toast.success('Registriert! Bitte E-Mail bestätigen');
					break;
				case 'error':
					toast.error('Error! Bitte versuche es später.');
					break;
				case 'failure':
					toast.error('Check deine Angaben nochmals!');
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<register-page-wrapper>
	<register-form>
		<h1>Registrieren</h1>
		<form method="POST" action="?/registerWithEmail" use:enhance>
			<input
				type="text"
				name="full_name"
				id="full_name"
				placeholder="Name, z.B. Max Mustermann"
				bind:value={$form.full_name}
			/>
			{#if $errors.full_name}<span>{$errors.full_name}</span>
			{/if}

			<input
				type="email"
				name="email"
				id="email"
				placeholder="E-Mail Adresse"
				bind:value={$form.email}
			/>
			{#if $errors.email}<span>{$errors.email}</span>
			{/if}

			<input
				type="password"
				name="password"
				id="password"
				placeholder="Passwort"
				bind:value={$form.password}
			/>
			{#if $errors.password}<span>{$errors.password}</span>
			{/if}

			<input
				type="password"
				name="passwordConfirm"
				id="passwordConfirm"
				placeholder="Passwort bestätigen"
				bind:value={$form.passwordConfirm}
			/>
			{#if $errors.passwordConfirm}<span>{$errors.passwordConfirm}</span>
			{/if}

			<button type="submit">Registrieren</button>
			<!-- 	<dsgvo-box>
				<input type="checkbox" name="dsgvo" id="dsgvo" required />
				<label for="dsgvo">Ich habe die Datenschutzbestimmungen gelesen und akzeptiere diese.</label
				>
			</dsgvo-box> -->
		</form>
		- oder -<br />
		<form id="github" method="POST" action="?/signupWithGithub">
			<button type="submit"
				><img width="40px" height="40px" src="/images/github-logo.svg" alt="" />Mit GitHub
				registrieren</button
			>
		</form>
		<form id="discord" method="POST" action="?/signupWithDiscord">
			<button type="submit"
				><img width="40px" height="40px" src="/images/discord-logo.svg" alt="" />Mit Discord
				registrieren</button
			>
		</form>
	</register-form>
</register-page-wrapper>

<style>
	register-page-wrapper {
		display: block;
		margin: 0 auto;
		width: var(--wrapperWidth);
		border-top: 1px solid #2d39db57;
		height: 60vh;

		& account-page-content {
			padding-top: 1rem;

			& left-side {
				padding: 2rem 0;
			}
		}

		& register-form {
			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			gap: 1rem;
			height: 100%;

			& form {
				width: 100%;
				display: flex;
				gap: 0.5rem;
				margin: 0 auto;
				flex-direction: column;
				align-items: center;

				& > input:not(:last-child) {
					width: 350px;
					height: 50px;
					border-radius: 0.5rem;
					padding: 0 0.5rem;
					border: none;
					border-bottom: 3px solid var(--tertColor);
				}

				& span {
					color: red;
				}

				& button {
					width: 350px;
				}
			}

			& .button {
				width: 350px;
				align-self: center;
			}

			& #github {
				& button {
					padding: 0.2rem 0;
					background-color: black;

					& img {
						color: white;
					}
				}
			}
			& #discord {
				& button {
					padding: 0.2rem 0;
					background-color: #5c6bc0;

					/* & img {
						background-color: white;
					} */
				}
			}
		}
	}
</style>
