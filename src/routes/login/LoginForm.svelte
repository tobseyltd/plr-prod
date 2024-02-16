<script lang="ts">
	import toast from 'svelte-french-toast';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type LoginSchema, loginSchema } from '../account/ZodSchema';
	import SocialLogins from '../../lib/utils/SocialLogins.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let data: SuperValidated<Infer<LoginSchema>>;
	export let supabase: SupabaseClient;
	export let height: string = '70vh';
	export let borderTop: string = '1px solid #2d39db57';

	const { form, errors, enhance } = superForm(data, {
		validators: zodClient(loginSchema),
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Eingeloggt!');
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

<login-form style={`height: ${height}; border-top: ${borderTop};`}>
	<h1>Login</h1>
	<form method="POST" action="?/login" use:enhance>
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
		<password-reset>
			<a href="/neues-passwort">Passwort vergessen?</a>
		</password-reset>
		- oder -<br />
		<SocialLogins {supabase} buttonSlogan="einloggen" />
	</form>
	<!-- - oder -<br />
	<a href="/registrieren"><button class="button">Mitglied werden</button></a> -->
</login-form>

<style>
	login-form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		gap: 1rem;

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
				font-size: 0.8rem;
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
