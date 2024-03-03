<script lang="ts">
	import Twitter from 'lucide-svelte/icons/twitter';

	export let hashtags: string[] = []; // array of hashtags exclude '#' e.g. ['svelte', 'askRodney']
	export let quote = undefined;

	export let related: any[] = []; // array of Twitter users (including '@')
	export let title: string; // text in Tweet
	export let url: string;
	export let via: string = ''; // include '@' e.g. '@askRodney'

	const TWITTER_BLUE = '#00aced';

	const baseUrl = 'https://twitter.com/share';
	const parametersObject = {
		url,
		...(hashtags.length > 0 ? { hashtags: hashtags.join(',') } : {}),
		quote,
		text: title,
		...(related.length > 0 ? { related: related.join(',') } : {}),
		...(via.length > 0 ? { via: via.slice(1) } : {})
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

<button on:click={handleClick}>
	<img src="../../images/twitter-x.svg" alt="twitter x icon" width="28	px" height="28	px" />
</button>

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
