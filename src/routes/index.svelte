<script lang="ts">
	import Select from '$lib/Select.svelte';
	import CopyIcon from 'icons/CopyIcon.svelte';
	import { snackBar, copyToClipboard } from '$lib/utils';
	// @ts-ignore
	import QRCode from 'qrcode';

	const options = [
		{ value: 'BTC', label: 'BTC', src: '/btc.jpeg', amount: 6.512345, min_dep: '-0.5', fee: '-1%' },
		{ value: 'ETH', label: 'ETH', src: '/eth.png', amount: 4.567238, min_dep: '-1', fee: '-0.7%' }
	];
	let selected;

	let QrCodeUrl;
	let code;

	const generateQR = async () => {
		code = Math.floor(2147483648 * Math.random() * 10 ** 15).toString(36);
		try {
			QrCodeUrl = await QRCode.toDataURL(code);
		} catch (err) {
			console.error(err);
		}
		if (innerWidth <= 768)
			setTimeout(() => document.querySelector('#wallet').scrollIntoView({ behavior: 'smooth' }));
	};
</script>

<div class="flex flex-col w-full h-full bg-white p-3 md:p-8 gap-6">
	<div class="flex justify-between flex-wrap md:flex-nowrap gap-12 ">
		<div class=" rounded flex flex-col gap-6" style="flex-basis: 430px;">
			<h1 class="text-3xl font-medium text-gray-800">Deposit Cryptocurrency</h1>
			<div>
				<div>
					<p>Currency</p>
					<Select
						items={options}
						bind:selected
						on:change={() => {
							QrCodeUrl = '';
							code = '';
						}}
					/>
				</div>
				{#if selected}
					<div class="flex gap-2 justify-between text-xs">
						<div>
							<span class="text-gray-400 pr-2">Minimum deposit </span>
							<span class="text-gray-600">{selected.min_dep} {selected.label}</span>
						</div>
						<div>
							<span class="text-gray-400 pr-2">Your fee</span>
							<span class="text-gray-600">{selected.fee}</span>
						</div>
					</div>
				{/if}
			</div>
			<button
				on:click={() => generateQR()}
				disabled={!selected}
				class="p-4 text-white font-medium shadow-md rounded"
				class:bg-gray-400={!selected}
				class:bg-blue-500={selected}>Generate Address</button
			>
		</div>

		{#if selected}
			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-2">
					<h3 class="text-gray-500">Network</h3>
					<div class="flex gap-4 items-center flex-wrap">
						<div class="text-3xl font-medium text-gray-700">ERC20</div>
						<div class="flex gap-2">
							<span>Number of confirmation </span>
							<span class="font-medium text-gray-700">-12 Blocks</span>
						</div>
					</div>
				</div>
				<div class="flex gap-3 items-centers shadow-md bg-white p-4 rounded">
					<div class="warn-sign">!</div>
					<div class="text-gray-500">
						Ensure the network you choose to deposite matches the withrawal network or assets may be
						lost
					</div>
				</div>
			</div>
		{/if}
	</div>
	{#if selected && QrCodeUrl}
		<div id="wallet">
			<h2 class="text-blue-900 font-medium text-xl">Wallet Address</h2>
			<div class="flex gap-3 md:gap-6 lg:gap-12 flex-wrap">
				<div class="flex flex-col bg-white shadow-md pb-3">
					<img width="350" height="350" class="max-w-full" src={QrCodeUrl} alt="wallet-address" />
					<button
						on:click={() => {
							copyToClipboard(code).then(() => snackBar.show('copied to clipboard'));
						}}
						class="flex items-center gap-3 text-blue-900 justify-center"
					>
						{code}

						<CopyIcon fill="rgba(30, 58, 138, var(--tw-bg-opacity))" size="1x" />
					</button>
				</div>
				<div class="flex items-end">
					<div
						class="flex gap-3 items-centers shadow-md bg-white p-4 rounded md:w-[30rem] md:max-w-full xl:w-full"
					>
						<div class="info-sign">!</div>
						<div class="text-gray-500">
							Please choose only {selected.label} to deposite to this address from your withdraw wallet
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.warn-sign {
		@apply bg-yellow-500 font-medium  text-white flex-shrink-0 text-lg w-6 h-6 rounded-full flex justify-center items-center p-1;
	}
	.info-sign {
		@apply bg-blue-600 font-medium  text-white flex-shrink-0 text-lg w-6 h-6 rounded-md flex justify-center items-center p-1;
		transform: rotate(180deg);
	}
</style>
