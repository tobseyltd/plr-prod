<script lang="ts">
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import toast from 'svelte-french-toast';
	import type { PageData } from './$types';
	import { registerUserSchema } from './ZodSchemas';
	import SocialLogins from '$lib/utils/SocialLogins.svelte';
	import LoadingSpinner from '$lib/utils/LoadingSpinner.svelte';
	import { toastSettings } from '$lib/toast-settings';
	import { goto } from '$app/navigation';
	import { AlertOctagon } from 'lucide-svelte';
	import { redirect } from '@sveltejs/kit';

	export let data: PageData;

	let loading: boolean = false;

	const { form, errors, enhance } = superForm(data.registerForm, {
		validators: zodClient(registerUserSchema),
		resetForm: true,

		onResult: ({ result }) => {
			loading = false;
			switch (result.type) {
				case 'success':
					toast.success('Bitte E-Mail Adresse bestätigen', toastSettings);
					break;
				case 'error':
					toast.error('Error! Bitte versuche es später.', toastSettings);
					break;
				case 'failure':
					toast.error('Check deine Angaben nochmals!', toastSettings);
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

<register-page-wrapper>
	<register-form>
		<h1>Registrieren</h1>
		<form method="POST" use:enhance>
			<input
				type="text"
				name="full_name"
				id="full_name"
				autocomplete="username"
				placeholder="Name, z.B. Max Mustermann"
				bind:value={$form.full_name}
			/>
			{#if $errors.full_name}<span
					><AlertOctagon color="yellow" size={20} /> {$errors.full_name}</span
				>
			{/if}

			<input
				type="email"
				name="email"
				id="email"
				placeholder="E-Mail Adresse"
				autocomplete="email"
				bind:value={$form.email}
			/>
			{#if $errors.email}<span><AlertOctagon color="yellow" size={20} /> {$errors.email}</span>
			{/if}

			<input
				type="password"
				name="password"
				id="password"
				placeholder="Passwort"
				autocomplete="new-password"
				bind:value={$form.password}
			/>
			{#if $errors.password}<span><AlertOctagon color="yellow" size={20} /> {$errors.password}</span
				>
			{/if}

			<input
				type="password"
				name="passwordConfirm"
				id="passwordConfirm"
				placeholder="Passwort bestätigen"
				autocomplete="new-password"
				bind:value={$form.passwordConfirm}
			/>
			{#if $errors.passwordConfirm}<span
					><AlertOctagon color="yellow" size={20} /> {$errors.passwordConfirm}</span
				>
			{/if}

			<button on:click={handleLoadingSpinner} type="submit">
				<b>Registrieren </b>
				<LoadingSpinner {loading} />
			</button>

			<dsgvo-box>
				<input type="checkbox" name="dsgvo" id="dsgvo" required />
				<label for="dsgvo"
					>Ich habe die <a href="/datenschutz">Datenschutzbestimmungen</a> gelesen und erkläre mich mit
					diesen einverstanden.</label
				>
			</dsgvo-box>
		</form>
		- oder -<br />
		<SocialLogins supabase={data.supabase} />
	</register-form>
</register-page-wrapper>

<style>
	:global(*) {
		line-height: 1rem !important;
	}

	register-page-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: var(--wrapperWidth);
		border-top: 1px solid var(--blueAccent);
		height: 80vh;
		width: 100%;

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
			height: auto;

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
					font-size: 0.7rem;

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
					gap: 0.4rem;
				}

				& button {
					width: 350px;

					@media (width < 451px) {
						width: 100%;
					}

					& b {
						margin-right: 0.4rem;
					}
				}

				& dsgvo-box {
					max-width: 350px;
					text-align: left;
					font-size: 15.5px;
					margin: 0.3rem 0;

					& a {
						color: var(--tertColor);
					}
				}
			}

			& .button {
				width: 350px;
				align-self: center;
			}
		}
	}
</style>
