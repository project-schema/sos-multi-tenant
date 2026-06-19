export const PWA_OPEN_INSTALL_EVENT = 'pwa:open-install';

export function isIOSDevice(): boolean {
	if (typeof navigator === 'undefined') return false;

	const isClassicIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
	const isIpadOS =
		navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

	return isClassicIOS || isIpadOS;
}

export function isStandaloneMode(): boolean {
	if (typeof window === 'undefined') return false;

	const isDisplayModeStandalone = window.matchMedia(
		'(display-mode: standalone)',
	).matches;

	const isIosStandalone =
		(window.navigator as Navigator & { standalone?: boolean }).standalone ===
		true;

	return isDisplayModeStandalone || isIosStandalone;
}

export function openPwaInstallPrompt(): void {
	if (typeof window === 'undefined') return;
	window.dispatchEvent(new CustomEvent(PWA_OPEN_INSTALL_EVENT));
}
