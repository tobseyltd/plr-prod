<script lang="ts">
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { toastSettings } from '$lib/toast-settings';
	import { AlertOctagon } from 'lucide-svelte';
	import { resetSchema } from './ZodSchemas';
	import LoadingSpinner from '$lib/utils/LoadingSpinner.svelte';

	export let data: PageData;
	let loading = false;

	const { form, errors, enhance } = superForm(data.resetForm, {
		validators: zodClient(resetSchema),
		resetForm: true,

		onResult: ({ result }) => {
			loading = false;
			switch (result.type) {
				case 'success':
					toast.success('Link an E-Mail Adresse geschickt!', toastSettings);
					break;
				case 'error':
					toast.error('Error! Versuche es später nochmal', toastSettings);
					break;
				case 'failure':
					toast.error('Gib eine gültige E-Mail Adresse ein.', toastSettings);
					break;
				default:
					return;
			}
			return;
		}
	});

	function handleLoadingSpinner() {
		loading = true;
	}
</script>

<password-reset-form>
	<h1>Magic Link anfordern</h1>

	<form method="POST" use:enhance>
		<input
			type="email"
			name="email"
			id="email"
			placeholder="E-Mail Adresse"
			autocomplete="email"
			bind:value={$form.email}
		/>

		{#if $errors.email}
			<span>
				<AlertOctagon color="yellow" size={20} />
				{$errors.email}
			</span>
		{/if}

		<button type="submit" on:click={handleLoadingSpinner}>
			<LoadingSpinner {loading} /> Absenden
		</button>
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
