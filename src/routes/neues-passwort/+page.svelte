<script lang="ts">
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { emailSchema } from '../account/ZodSchema';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.resetForm, {
		validators: zodClient(emailSchema),
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Ein Link wurde an deine E-Mail Adresse geschickt!');
					break;
				case 'error':
					toast.error('Error! Versuche es später nochmal');
					break;
				case 'failure':
					toast.error('Gib eine gültige E-Mail Adresse ein.');
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<password-reset-form>
	<h1>Neues Passwort anfordern</h1>
	<form method="POST" action="?/resetPassword" use:enhance>
		<input
			type="email"
			name="email"
			id="email"
			placeholder="E-Mail Adresse"
			bind:value={$form.email}
		/>
		{#if $errors.email}<span>{$errors.email}</span>{/if}

		<button type="submit">Passwort zurücksetzen</button>
	</form>
</password-reset-form>

<style>
	password-reset-form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		gap: 1rem;
		height: 60vh;

		@media (width < 451px) {
			height: 40vh;
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

			& span {
				color: red;
			}

			& button {
				width: 350px;
			}

			& password-reset {
				width: 350px;
				text-align: left;
				font-size: 0.9rem;
				margin-top: 0.2rem;

				& a {
					color: white;
				}
			}
		}

		& .button {
			display: inline-block;
			width: 350px;
			align-self: center;
		}
	}
</style>
