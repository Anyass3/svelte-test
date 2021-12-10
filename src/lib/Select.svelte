<script lang="ts">
	import SearchIcon from '$lib/searchIcon.svelte';
	import ChevronDownIcon from 'icons/ChevronDownIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	export let items: { value: string; label: string; src: string; amount: number }[] = [],
		focused = false,
		selected = undefined;
	$: options = items;
	const dispatch = createEventDispatcher();
	const unSelect = (val) => {
		selected = selected.filter((item) => item !== val);
	};

	const clickOutside = (ev) => {
		const el = ev.path.find((el) => el.id === 'select-currency');
		if (!el) {
			focused = false;
			selected = selected;
		}
	};
	const filter = (ev) => {
		const searchKey = ev.target?.value?.toLowerCase() || '';
		if (searchKey) options = items.filter(({ label }) => label.toLowerCase().includes(searchKey));
		else options = items;
	};
	let search = false;
	let changedKey;
</script>

<svelte:body on:click={clickOutside} />
<div
	id="select-currency"
	class="relative border-2 transition rounded"
	class:border-blue-500={focused}
>
	<div class="flex-grow flex items-center p-3">
		{#key changedKey}
			{#if !selected || search}
				<SearchIcon />
			{:else}
				<img src={selected.src} class=" rounded-full w-4 h-4 inline-block" alt="" />
			{/if}
			{#key selected}
				<input
					type="text"
					class="p-2 focus:outline-none flex-grow w-full"
					placeholder={focused ? 'start entering the currency' : 'Select Currency'}
					on:keyup={filter}
					value={selected?.value || ''}
					on:focus={() => (focused = true)}
				/>
			{/key}
		{/key}
		<div class="icon">
			<ChevronDownIcon size="1x" />
		</div>
	</div>
	{#if focused}
		<div class=" absolute w-full mt-1">
			{#each options as option}
				<div
					class="p-2 flex justify-between w-full bg-gray-100 rounded-sm shadow"
					tabindex="-1"
					on:click={() => {
						selected = option;
						focused = false;
						dispatch('change');
						changedKey = Math.random();
					}}
				>
					<div>
						<img src={option.src} class=" rounded-full w-4 h-4 inline-block" alt="" />
						<span>{option.label}</span>
					</div>
					<div>{option.amount}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
