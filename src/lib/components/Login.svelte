<script lang="ts">
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from '../../routes/$types';
	import loginSchema from '../../routes/account/ZodSchema';

	export let data: any;
	let { supabase, session, loginForm } = data;
	$: ({ supabase, session, loginForm } = data);

	const { form, errors, enhance } = superForm(loginForm, {
		validators: zodClient(loginSchema),
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
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

<login-form>
	<h1>Login</h1>
	<form method="POST" action="/login" use:enhance>
		<input
			type="email"
			name="email"
			id="email"
			placeholder="E-Mail Adresse"
			bind:value={$form.email}
		/>
		{#if $errors.email}<span>{$errors.email}</span>{/if}

		<input
			type="password"
			name="password"
			id="password"
			placeholder="Passwort"
			bind:value={$form.password}
		/>
		{#if $errors.password}<span>{$errors.password}</span>{/if}

		<button type="submit">Einloggen</button>
	</form>
	- oder -<br />
	<a href="/registrieren"><button class="button">Mitglied werden</button></a>
</login-form>
