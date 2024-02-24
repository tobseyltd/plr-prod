<script lang="ts">
	import { AlertOctagon, Mail } from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { emailSchema, type EmailSchema } from './ZodSchema';
	import toast from 'svelte-french-toast';
	import { toastSettings } from '$lib/toast-settings';
	import LoadingSpinner from '$lib/utils/LoadingSpinner.svelte';

	export let data: SuperValidated<Infer<EmailSchema>>;
	let loading = false;

	const { form, errors, enhance } = superForm(data, {
		validators: zodClient(emailSchema),

		onResult: ({ result }) => {
			loading = false;
			switch (result.type) {
				case 'success':
					toast.success('E-Mail Adresse geändert.', toastSettings);
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

<email-details>
	<h2><span><Mail size={22} strokeWidth={1.5} /></span> E-Mail Adresse</h2>
	<p>Ändere deine E-Mail Adresse hier</p>
	<br />

	<form action="?/updateEmail" method="POST" use:enhance>
		<label for="email">
			<span>E-Mail</span>
			<input type="text" name="email" id="email" bind:value={$form.email} />

			{#if $errors.email}
				<span>
					<AlertOctagon color="yellow" size={20} />
					{$errors.email}
				</span>
			{/if}
		</label>

		<button type="submit" on:click={handleLoadingSpinner}>
			<LoadingSpinner {loading} /> E-Mail ändern
		</button>
	</form>
</email-details>

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
