<script lang="ts">
	export let url: string;
	export let title: string;

	const TELEGRAM_BLUE = '#49a9e9';

	const baseUrl = 'https://telegram.me/share/url';
	const parametersObject = {
		url,
		text: title
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

<button on:click={handleClick}
	><img
		src="../../images/telegram.svg"
		alt="telegram share icon"
		width="26px"
		height="26px"
	/></button
>

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
