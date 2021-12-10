import { writable } from 'svelte/store';
function createSnackBar() {
	const { subscribe, update, set } = writable(null);

	return {
		subscribe,
		show: (value: string, timeout = 3000) =>
			update(() => {
				setTimeout(() => set(null), timeout);
				return value;
			})
	};
}
export const snackBar = createSnackBar();

export const copyToClipboard = async (text: string) => {
	if (!text) return false;
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (error) {
			//
			console.error(error);
		}
	}
	try {
		const input = document.createElement('textarea');
		input.innerHTML = text;
		document.body.appendChild(input);
		input.select();
		const copied = document.execCommand('copy');
		document.body.removeChild(input);
		console.log(copied);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
