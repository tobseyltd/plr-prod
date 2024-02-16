<script lang="ts">
	import { enhance } from '$app/forms';
	import { SupabaseClient, type Provider } from '@supabase/supabase-js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';

	export let buttonSlogan: string = 'registrieren';
	export let supabase: SupabaseClient;

	const signInWithProvider = async (provider: Provider) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: provider
		});

		if (error) {
			toast.error(error.message);
		}
	};

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		switch (action.searchParams.get('provider')) {
			case 'google':
				await signInWithProvider('google');
				break;
			case 'discord':
				await signInWithProvider('discord');
				break;
			case 'github':
				await signInWithProvider('github');
				break;
			default:
				break;
		}
		cancel();
	};
</script>

<form method="POST" use:enhance={submitSocialLogin}>
	<button id="github" formaction="/login?/login&provider=github"
		><img width="35px" height="35px" src="/images/github-logo.svg" alt="" />Mit GitHub {buttonSlogan}</button
	>
	<button id="discord" formaction="/login?/login&provider=discord"
		><img width="35px" height="35px" src="/images/discord-logo.svg" alt="" />Mit Discord
		{buttonSlogan}</button
	>
	<button id="google" formaction="/login?/login&provider=google"
		><img width="30px" height="30px" src="/images/google-logo.svg" alt="" />Mit Google
		{buttonSlogan}</button
	>
</form>

<style>
	#github {
		padding: 0.2rem 0;
		background-color: black;

		& img {
			color: white;
		}
	}

	#discord {
		padding: 0.2rem 0;
		background-color: #5c6bc0;
	}

	#google {
		padding: 0.2rem 0;
		background-color: white;
		color: black;
		text-shadow: none;
	}
</style>
