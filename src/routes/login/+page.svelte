<script lang="ts">
	import LoginForm from './LoginForm.svelte';

	export let data: LoginForm;
</script>

<LoginForm data={data.loginForm} />
