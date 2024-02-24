<script lang="ts">
	import { AlertOctagon, CircleUserRound } from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { profileSchema, type ProfileSchema } from './ZodSchema';
	import toast from 'svelte-french-toast';
	import { toastSettings } from '$lib/toast-settings';
	import LoadingSpinner from '$lib/utils/LoadingSpinner.svelte';

	export let data: SuperValidated<Infer<ProfileSchema>>;
	let loading = false;

	const { form, errors, enhance } = superForm(data, {
		validators: zodClient(profileSchema),
		onUpdated(event) {
			$form.full_name = event.form.data.full_name;
		},
		onResult: ({ result }) => {
			loading = false;
			switch (result.type) {
				case 'success':
					toast.success('Nutzername geändert.', toastSettings);
					break;
				case 'error':
					toast.error('Error! Versuche es später nochmal', toastSettings);
					break;
				case 'failure':
					toast.error('Gig einen gültigen Nutzernamen ein.', toastSettings);
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

<personal-details>
	<h2><span><CircleUserRound size={22} strokeWidth={1.5} /></span> Persönliche Details</h2>
	<p>Ändere deine persönlichen Account-Details</p>
	<br />

	<form action="?/updateProfile" method="POST" use:enhance>
		<label for="full_name">
			<span>Vor- & Nachame</span>

			<input type="text" name="full_name" id="full_name" bind:value={$form.full_name} />
			{#if $errors.full_name}
				<span class="error">
					<AlertOctagon color="yellow" size={20} />
					{$errors.full_name}
				</span>
			{/if}
		</label>

		<button type="submit" on:click={handleLoadingSpinner}>
			<LoadingSpinner {loading} /> Name Ändern
		</button>
	</form>
</personal-details>

<style>
	.error {
		color: red;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
