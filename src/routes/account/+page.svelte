<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from './ZodSchema';
	import toast, { Toaster } from 'svelte-french-toast';
	import { ReceiptEuro, UserRound, UserRoundX } from 'lucide-svelte';
	import ProfileForm from './PofileForm.svelte';
	import EmaiLForm from './EmaiLForm.svelte';
	import PasswordForm from './PasswordForm.svelte';
	import { goto } from '$app/navigation';
	import Tooltip from '$lib/utils/Tooltip.svelte';
	import { modal } from '$lib/stores/stores';
	import Modal from '../../lib/utils/Modal.svelte';
	import DeleteModalContent from './DeleteModalContent.svelte';

	export let data: PageData;

	const paymentStatus = data.paymentStatus === 'paid' && 'Lifetime Mitgliedschaft';

	function navigateTo() {
		goto('/account/kundenportal');
	}
</script>

<Toaster />
<account-page-wrapper>
	{#if data.session}
		<account-page-content>
			<section>
				<h1>Account Einstellungen</h1>
				<p>Ändere dein Passwort, E-Mail Adresse, Bezahlung und andere Details</p>
			</section>

			<billing-section>
				<h2><span><ReceiptEuro size={22} strokeWidth={1.5} /></span> Derzeitige Mitgliedschaft</h2>
				<p>Verwalte deine Mitgliedschaft & Bezahlung</p>
				<br />

				{#if data.paymentStatus === 'paid' && data.tier === 'Keine'}
					<p>Aktive Mitgliedschaft: <b>{paymentStatus}</b></p>
					<Tooltip tooltip="Du hast schon eine Lifetime Mitgliedschaft">
						<button disabled>Mitgliedschaft Verwalten</button>
					</Tooltip>
				{:else}
					<p>
						Aktive Mitgliedschaft: <b>{data.tier}</b>
						<button on:click={navigateTo}>Mitgliedschaft Verwalten</button>
					</p>{/if}
			</billing-section>

			<ProfileForm data={data.profileForm} />
			<EmaiLForm data={data.emailForm} />
			<PasswordForm data={data.passwordForm} />

			<delete-account>
				<h2><span><UserRoundX size={22} strokeWidth={1.5} /></span> Account & Daten löschen</h2>
				<p>Lösche alle Daten (inkl. Stripe) & Account</p>
				<br />

				<Modal show={$modal}>
					<DeleteModalContent />
				</Modal>
			</delete-account>
		</account-page-content>
	{/if}
</account-page-wrapper>

<style>
	account-page-wrapper {
		display: block;
		margin: 0 auto;
		height: auto;

		& account-page-content {
			padding-top: 1rem;
			display: flex;
			flex-direction: column;
			gap: 3rem;
			margin: 0 auto;
			text-align: center;

			& billing-section,
			personal-details,
			email-details,
			password-details,
			delete-account {
				display: block;
				margin: 0 auto;
				text-align: start;
				width: 60%;
				padding: 2rem 5rem;
				border-bottom: 1px solid var(--blueAccent);

				@media (width > 768px) {
					width: 70%;
				}

				@media (width < 769px) {
					width: 100%;
				}

				@media (width < 451px) {
					width: 100%;
					padding: 2rem 0;
				}

				@media (width > 1339px) {
					width: 50%;
				}

				@media (width > 1919px) {
					width: 50%;
				}

				& h2 {
					align-items: center;
					display: flex;
					font-size: 1.1rem;
					gap: 0.6rem;
					padding: 0.2rem 0;

					& span {
						margin-top: -0.25rem;
						display: flex;
						align-items: center;
					}
				}

				& input {
					background-color: var(--bgContainer);
					width: 100%;
					height: 44px;
					border: none;
					border-radius: 10px;
					padding-inline: 1rem;
					color: white;
				}

				& label span {
					font-size: 0.8rem;
				}

				& button {
					margin: 1rem 0;
					font-size: 0.65rem;
					padding: 0.5rem 1rem;

					&:disabled {
						background-color: var(--bgContainer);
					}
				}

				& [data-tooltip]:before {
					bottom: -90%;
					left: 20%;
				}

				& [data-tooltip]:after {
					top: 115%;
					left: 20%;
				}
			}
		}
	}
</style>
