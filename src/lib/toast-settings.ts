import type { Toast } from 'svelte-french-toast';

export const toastSettings: Partial<Pick<Toast, 'position' | 'style' | 'duration'>> = {
	position: 'bottom-center',
	style: 'font-size: 15px; width: auto;',
	duration: 5000
};
