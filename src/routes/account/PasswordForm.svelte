<script lang="ts">
	import { AsteriskSquare } from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { passwordSchema, type PasswordSchema } from './ZodSchema';

	export let data: SuperValidated<Infer<PasswordSchema>>

	const { form, errors, enhance } = superForm(data, {
		validators: zodClient(passwordSchema),
		resetForm: true
	});
</script>

<password-details>
	<h2>
		<span><AsteriskSquare size={20} strokeWidth={1.5} /> </span> Passwort
	</h2>
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
			{#if $errors.password}<span>{$errors.password}</span>{/if}
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
			{#if $errors.passwordConfirm}<span>{$errors.passwordConfirm}</span>{/if}
			<button type="submit">Passwort Ändern</button>
		</label>
	</form>
</password-details>
