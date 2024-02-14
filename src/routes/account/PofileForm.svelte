<script lang="ts">
	import { CircleUserRound } from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { profileSchema, type ProfileSchema } from './ZodSchema';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: SuperValidated<Infer<ProfileSchema>>;

	const { form, errors, enhance } = superForm(data, {
		validators: zodClient(profileSchema),
		onUpdated(event) {
			$form.full_name = event.form.data.full_name;
			
			event.form.valid &&
				toast.success('Name geändert!', {
					position: 'bottom-right'
				});
			!event.form.valid && toast.error('Irgenwas lief schief!'),
				{
					position: 'bottom-right'
				};
		}
	});
</script>

<Toaster />
<personal-details>
	<h2>
		<span><CircleUserRound size={22} strokeWidth={1.5} /></span> Persönliche Details
	</h2>

	<p>Ändere deine persönlichen Account-Details</p>
	<br />

	<form action="?/updateProfile" method="POST" use:enhance>
		<label for="full_name">
			<span>Vor- & Nachame</span>
			<input type="text" name="full_name" id="full_name" bind:value={$form.full_name} />
			{#if $errors.full_name}<span>{$errors.full_name}</span>{/if}
		</label>

		<button type="submit">Name Ändern</button>
	</form>
</personal-details>
