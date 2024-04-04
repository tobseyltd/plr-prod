<script lang="ts">
	import { browser } from '$app/environment';
	import Twitter from '$lib/components/ShareButtons/Twitter.svelte';
	import { ShareIcon } from 'lucide-svelte';
	import website from '../../../website';
	import Facebook from './Facebook.svelte';
	import Telegram from './Telegram.svelte';
	import Whatsapp from './Whatsapp.svelte';

	const { siteTitle, siteUrl } = website;

	export let slug: string;
	export let title: string;

	$: webShareAPISupported = browser && typeof navigator.share !== 'undefined';

	$: handleWebShare;
	const handleWebShare = async () => {
		try {
			navigator.share({
				title,
				text: `Shared from ${siteTitle}`,
				url
			});
		} catch (error) {
			webShareAPISupported = false;
		}
	};

	const url = `${siteUrl}${slug}`;
</script>

<section aria-label="Share buttons">
	<share-wrapper>
		Teilen: <button-box>
			<Twitter {url} {title} />
			<Facebook {url} />
			<Telegram {url} {title} />
			<Whatsapp {url} {title} />
		</button-box>
	</share-wrapper>
</section>

<style>
	share-wrapper {
		margin-top: 2rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		border-top: 1px solid var(--blueAccent);
		padding-top: 1rem;

		& button-box {
			width: 100%;
			display: flex;
			justify-content: space-between;

			& button {
				padding: 0.35rem;
			}
		}
	}
</style>
