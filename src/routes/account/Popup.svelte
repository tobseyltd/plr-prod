<script lang="ts">
	import { ShieldAlert } from 'lucide-svelte';

	export let message = 'Account und alle dazugehörigen Daten löschen?';
</script>

<popup-wrapper>
	<h2><span><ShieldAlert strokeWidth={1.25} color="red" size={32} /></span>{message}</h2>
	<div>
		<form action="?/deleteProfile" method="POST">
			<button type="submit">Ja all meine Daten löschen</button>
		</form>
	</div>
</popup-wrapper>

<style>
	popup-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
	}

	h2 {
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		font-size: 2rem;
	}

	div {
		display: flex;
		justify-content: center;
		gap: 1rem;

		& form {
			& button {
				background-color: brown;

				&:hover {
					background-color: rgba(165, 42, 42, 0.722);
				}
			}
		}
	}
</style>
