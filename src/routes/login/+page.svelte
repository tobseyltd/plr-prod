<script lang="ts">
	import LoginForm from './LoginForm.svelte';

	export let data: any;
</script>

<LoginForm supabase={data.supabase} data={data.loginForm} />
