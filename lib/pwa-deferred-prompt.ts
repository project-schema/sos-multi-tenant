export interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{
		outcome: 'accepted' | 'dismissed';
		platform: string;
	}>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<(prompt: BeforeInstallPromptEvent) => void>();

function attachEarlyInstallPromptListener() {
	if (typeof window === 'undefined') return;

	const win = window as Window & { __pwaEarlyListenerAttached?: boolean };
	if (win.__pwaEarlyListenerAttached) return;
	win.__pwaEarlyListenerAttached = true;

	window.addEventListener(
		'beforeinstallprompt',
		(event) => {
			event.preventDefault();
			deferredPrompt = event as BeforeInstallPromptEvent;
			listeners.forEach((listener) => listener(deferredPrompt!));
		},
		{ capture: true },
	);

	window.addEventListener('appinstalled', () => {
		deferredPrompt = null;
	});
}

attachEarlyInstallPromptListener();

export function getDeferredInstallPrompt(): BeforeInstallPromptEvent | null {
	return deferredPrompt;
}

export function subscribeToInstallPrompt(
	listener: (prompt: BeforeInstallPromptEvent) => void,
): () => void {
	listeners.add(listener);
	if (deferredPrompt) {
		listener(deferredPrompt);
	}
	return () => listeners.delete(listener);
}

export function clearDeferredInstallPrompt(): void {
	deferredPrompt = null;
}
