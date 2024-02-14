<script lang="ts">
	import './registrieren-page.css';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import registerUserSchema from './ZodSchema';

	export let data: PageData;

	let { supabase, registerForm } = data;
	$: ({ supabase, registerForm } = data);

	const { form, errors, enhance } = superForm(registerForm, {
		validators: zodClient(registerUserSchema),
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Registriert! Bitte E-Mail bestätigen');
					break;
				case 'error':
					toast.error('Error! Bitte versuche es später.');
					break;
				case 'failure':
					toast.error('Check deine Angaben nochmal!s');
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
		<form method="POST" use:enhance>
			<input
				type="text"
				name="name"
				id="name"
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
	</register-form>
</register-page-wrapper>
