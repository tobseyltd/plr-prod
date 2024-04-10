<script lang="ts">
	import toast from 'svelte-french-toast';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type LoginSchema, loginSchema } from '../account/ZodSchema';
	import SocialLogins from '../../lib/utils/SocialLogins.svelte';
	import { AlertOctagon } from 'lucide-svelte';
	import { toastSettings } from '$lib/toast-settings';

	export let data: SuperValidated<Infer<LoginSchema>>;
	export let supabase: any;
	export let height: string = '70vh';
	export let borderTop: string = '1px solid var(--blueAccent)';
	export let register: boolean = false;
	export let showHeader: boolean = true;

	const { form, errors, enhance } = superForm(data, {
		validators: zodClient(loginSchema),
		resetForm: true,
		onSubmit: (event) => {
			event.action.searchParams.append('redirectedFrom', window.location.pathname);
		},
		onResult: ({ result }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Eingeloggt!', toastSettings);
					break;
				case 'error':
					toast.error('Das hat nicht geklappt!', toastSettings);
					break;
				case 'failure':
					toast.error('Überprüfe deine Angaben nochmal!', toastSettings);
					break;
				default:
					return;
			}
			return;
		}
	});
</script>

<login-form style={`height: ${height}; border-top: ${borderTop};`}>
	{#if showHeader}
		<h1>Login</h1>
	{:else}
		<p>Einloggen oder <a href="/mitglied-werden">Mitglied werden</a></p>
	{/if}
	<form method="POST" action="/login?/login" use:enhance>
		<input
			type="email"
			name="email"
			id="email"
			autocomplete="email"
			placeholder="E-Mail Adresse"
			bind:value={$form.email}
		/>
		{#if $errors.email}
			<span>
				<AlertOctagon color="yellow" size={20} />
				{$errors.email}
			</span>
		{/if}

		<input
			type="password"
			name="password"
			id="password"
			placeholder="Passwort"
			autocomplete="current-password"
			bind:value={$form.password}
		/>
		{#if $errors.password}
			<span>
				<AlertOctagon color="yellow" size={20} />
				{$errors.password}
			</span>
		{/if}

		<button type="submit">Einloggen</button>
		<password-reset>
			<a href="/neues-passwort">Passwort vergessen?</a>
		</password-reset>
		- oder -<br />
		<SocialLogins {supabase} buttonSlogan="einloggen" />
	</form>

	{#if register}
		- oder -<br />
		<a href="/miglied-werden"><button class="button"> Mitglied werden</button></a>
	{/if}
</login-form>

<style>
	login-form {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		gap: 1rem;

		@media (width <= 450px) {
			height: 45vh !important;
		}

		& p {
			border: none !important;
			text-align: center;

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

				@media (width < 451px) {
					width: 100%;
				}
			}

			& span {
				color: rgb(222, 20, 20);
				width: 100%;
				font-size: 18px;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.3rem;
			}

			& button {
				width: 350px;

				@media (width < 451px) {
					width: 100%;
				}
			}

			& password-reset {
				width: 350px;
				text-align: center;
				font-size: 0.8rem;
				margin-top: 0.2rem;

				& a {
					color: white;
				}

				@media (width < 451px) {
					width: 100%;
				}
			}
		}

		& .button {
			display: inline-block;
			width: 350px;
			align-self: center;

			@media (width < 451px) {
				width: 100%;
			}
		}
	}
</style>
