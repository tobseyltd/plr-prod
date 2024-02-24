<script lang="ts">
	import { AlertOctagon, AsteriskSquare } from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { passwordSchema, type PasswordSchema } from './ZodSchema';
	import { toastSettings } from '$lib/toast-settings';
	import toast from 'svelte-french-toast';
	import LoadingSpinner from '$lib/utils/LoadingSpinner.svelte';

	export let data: SuperValidated<Infer<PasswordSchema>>;
	let loading = false;

	const { form, errors, enhance } = superForm(data, {
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
		}
	});

	function handleLoadingSpinner() {
		loading = true;
	}
</script>

<password-details>
	<h2><span><AsteriskSquare size={20} strokeWidth={1.5} /> </span> Passwort</h2>
	<p>Ändere dein Account Passwort</p>
	<br />

	<form action="?/updatePassword" method="POST" use:enhance>
		<label for="password">
			<span>Neues Passwort</span>
			
			<input
				autocomplete="current-password"
				type="password"
				name="password"
				id="password"
				placeholder="Passwort eingeben"
				bind:value={$form.password}
			/>

			{#if $errors.password}
				<span>
					<AlertOctagon color="yellow" size={20} />
					{$errors.password}
				</span>
			{/if}

			<br />
			<br />
		</label>

		<label for="passwordConfirm">
			<span>Passwort bestätigen</span>
			<input
				autocomplete="new-password"
				type="password"
				name="passwordConfirm"
				id="passwordConfirm"
				placeholder="Passwort wiederholen"
				bind:value={$form.passwordConfirm}
			/>

			{#if $errors.passwordConfirm}
				<span>
					<AlertOctagon color="yellow" size={20} />
					{$errors.passwordConfirm}
				</span>
			{/if}

			<button type="submit" on:click={handleLoadingSpinner}>
				<LoadingSpinner {loading} /> Passwort Ändern
			</button>
		</label>
	</form>
</password-details>

<style>
	input {
		& span {
			color: red;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
