<script lang="ts">
	import LucideFacebook from 'lucide-svelte/icons/facebook';

	export let hashtag: string = '';
	export let quote: string = '';
	export let url: string;

	const FACEBOOK_BLUE = '#3b5998';

	const baseUrl = 'https://www.facebook.com/sharer/sharer.php';
	const parametersObject = {
		u: url,
		...(quote !== '' ? { quote } : {}),
		...(hashtag !== '' ? { hashtag } : {})
	};

	const params = Object.entries(parametersObject)
		.filter(([, value]) => value ?? false)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		.join('&');

	const urlWithParameters = params === '' ? baseUrl : `${baseUrl}?${params}`;

	function handleClick() {
		const config: {
			height: number;
			width: number;
			location: 'yes' | 'no';
			toolbar: 'yes' | 'no';
			status: 'yes' | 'no';
			directories: 'yes' | 'no';
			menubar: 'yes' | 'no';
			scrollbars: 'yes' | 'no';
			resizable: 'yes' | 'no';
			centerscreen: 'yes' | 'no';
			chrome: 'yes' | 'no';
			[key: string]: string | number; // Index signature allowing string index
		} = {
			height: 550,
			width: 400,
			location: 'no',
			toolbar: 'no',
			status: 'no',
			directories: 'no',
			menubar: 'no',
			scrollbars: 'yes',
			resizable: 'no',
			centerscreen: 'yes',
			chrome: 'yes'
		};
		return window.open(
			urlWithParameters,
			'',
			Object.keys(config)
				.map((key) => `${key}=${config[key]}`)
				.join(',')
		);
	}
</script>

<button on:click={handleClick}><LucideFacebook strokeWidth={1.5} /></button>

<style>
	button {
		background: transparent;
		border-style: none;
		transition: all 0.2s ease-in-out;
		border: var(--mainBorder);
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: all 2s ease-in-out;
		}
	}

	button:focus,
	button:hover {
		transform: scale(1.1);
	}
</style>
