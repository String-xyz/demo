import { writable, type Writable, get as getStore } from "svelte/store";

type ToastType = "success" | "error";
type ToastOptions = {
	message: string;
	type: ToastType;
	_display?: () => void;
	show: (message: string, type?: ToastType) => void;
};

const _showToast = (message: string, type: ToastType = "error") => {
	const _toast = getStore(toast);
	toast.set({ ..._toast, type, message });
	if (_toast._display) _toast._display();
};

export const toast: Writable<ToastOptions> = writable({
	message: "error",
	type: "error",
	show: _showToast
});
