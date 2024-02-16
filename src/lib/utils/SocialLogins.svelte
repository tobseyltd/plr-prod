<script lang="ts">
	export let buttonSlogan: string = 'registrieren';
</script>

<form method="POST">
	<button id="github" formaction="/login?/login&provider=github"
		><img width="40px" height="40px" src="/images/github-logo.svg" alt="" />Mit GitHub {buttonSlogan}</button
	>
	<button id="discord" formaction="/login?/login&provider=discord"
		><img width="40px" height="40px" src="/images/discord-logo.svg" alt="" />Mit Discord
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
</style>
