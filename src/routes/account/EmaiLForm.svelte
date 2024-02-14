<script lang="ts">
	import { Mail } from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { emailSchema, type EmailSchema } from './ZodSchema';

	export let data: SuperValidated<Infer<EmailSchema>>;

	const { form, errors, enhance } = superForm(data, {
		validators: zodClient(emailSchema)
	});
</script>

<email-details>
	<h2>
		<span><Mail size={22} strokeWidth={1.5} /></span> E-Mail Adresse
	</h2>
	<p>Ändere deine E-Mail Adresse hier</p>
	<br />
	<form action="?/updateEmail" method="POST" use:enhance>
		<label for="email">
			<span>E-Mail</span>
			<input type="text" name="email" id="email" bind:value={$form.email} />
			{#if $errors.email}<span>{$errors.email}</span>{/if}
		</label>
		<button type="submit">E-Mail Ändern</button>
	</form>
</email-details>
