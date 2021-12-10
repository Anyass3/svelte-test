<script>
	import '$lib/app.css';
	import 'tailwindcss/tailwind.css';
	import Nav from '$lib/nav.svelte';
	import SnackBar from '$lib/snack-bar.svelte';
</script>

<div class="h-screen flex flex-col select-none" style="color: #8e8d96;">
	<Nav />
	<div class="p-[var(--padding)] shadow-lg bg-gray-100 w-full flex-grow">
		<slot />
	</div>
</div>
<SnackBar />
