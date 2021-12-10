<script>
	import ChevronLeftIcon from 'icons/ChevronLeftIcon.svelte';
	import BellIcon from 'icons/BellIcon.svelte';
	import ChevronDownIcon from 'icons/ChevronDownIcon.svelte';
</script>

<div class="flex justify-between py-6 px-[var(--padding)] bg-gray-200 text-base flex-wrap gap-4">
	<a class="flex gap-2 items-center" href="/">
		<div class="icon"><ChevronLeftIcon size="15" /></div>
		<div>Back to Fait and Spot</div>
	</a>

	<div class="flex gap-8 items-center flex-wrap">
		<div class="flex gap-6 items-centers flex-grow justify-between">
			<div class="cursor-pointer"><BellIcon size="30" /></div>
			<div class="w-8 h-8 rounded-full bg-gray-700 cursor-pointer" />
		</div>
		<span class="text-gray-300 text-3xl font-light hidden md:block ">|</span>
		<div class="flex-grow flex justify-between">
			<div style="word-spacing: 1px;" class="flex items-center cursor-pointer">
				English / USD <span><ChevronDownIcon size="1x" /></span>
			</div>
			<button class="cursor-pointer">Download</button>
		</div>
	</div>
</div>
