<script>
	import Popup from './Popup.svelte';
	import { modal } from '$lib/stores/stores';

	const showPopup = () => {
		// @ts-ignore
		modal.set(Popup);
	};
</script>

<button on:click={showPopup}>Account löschen</button>
