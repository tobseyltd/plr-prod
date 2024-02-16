<script lang="ts">
	import type { PageData } from '../$types';
	import LoginForm from './LoginForm.svelte';

	export let data: PageData & LoginForm;
</script>

<LoginForm supabase={data.supabase} data={data.loginForm} />
