<script lang="ts">
	import { toastSettings } from '$lib/toast-settings';
	import { AlertOctagon } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { passwordSchema } from '../account/ZodSchema';
	import type { PageData } from './$types';
	import LoadingSpinner from '$lib/utils/LoadingSpinner.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let loading = false;

	const { form, errors, enhance } = superForm(data.resetPwForm, {
		validators: zodClient(passwordSchema),
		resetForm: true,

		onResult: ({ result }) => {
			loading = false;
			switch (result.type) {
				case 'success':
					toast.success('Passwort geändert!', toastSettings);
					break;
				case 'error':
					toast.error('Error! Versuche es später nochmal', toastSettings);
					break;
				case 'failure':
					toast.error('Gib ein gültiges Passwort ein..', toastSettings);
					break;
				default:
					return;
			}
			return;
		},
		onUpdated() {
			goto('/account');
		}
	});

	function handleLoadingSpinner() {
		loading = true;
	}
</script>

<password-reset-form>
	<h1>Neues Passwort setzen</h1>
	<form method="POST" use:enhance>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="Passwort"
			autocomplete="new-password"
			bind:value={$form.password}
		/>

		{#if $errors.password}
			<span>
				<AlertOctagon color="yellow" size={20} />
				{$errors.password}
			</span>
		{/if}

		<input
			type="password"
			name="passwordConfirm"
			id="passwordConfirm"
			placeholder="Passwort bestätigen"
			autocomplete="new-password"
			bind:value={$form.passwordConfirm}
		/>

		{#if $errors.passwordConfirm}
			<span>
				<AlertOctagon color="yellow" size={20} />
				{$errors.passwordConfirm}
			</span>
		{/if}

		<button on:click={handleLoadingSpinner} type="submit">
			<b>Absenden </b>
			<LoadingSpinner {loading} />
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
				display: flex;
				align-items: center;
				justify-content: center;
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
