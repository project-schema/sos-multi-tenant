'use client';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	clearDeferredInstallPrompt,
	getDeferredInstallPrompt,
	subscribeToInstallPrompt,
	type BeforeInstallPromptEvent,
} from '@/lib/pwa-deferred-prompt';
import { getPwaStorageKeyFromWindow } from '@/lib/pwa-scope';
import {
	dismissFor15Days,
	hydratePwaState,
	selectCanShowPrompt,
	selectIsInstalled,
	setInstalled,
	type PwaState,
} from '@/store/features/pwa/pwaSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
	Check,
	Download,
	Loader2,
	PlusSquare,
	Share2,
	Smartphone,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

type PromptVariant = 'chromium' | 'ios';

function isIOSDevice(): boolean {
	if (typeof navigator === 'undefined') return false;

	const isClassicIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
	const isIpadOS =
		navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

	return isClassicIOS || isIpadOS;
}

function isStandaloneMode(): boolean {
	if (typeof window === 'undefined') return false;

	const isDisplayModeStandalone = window.matchMedia(
		'(display-mode: standalone)'
	).matches;

	const isIosStandalone =
		(window.navigator as Navigator & { standalone?: boolean }).standalone ===
		true;

	return isDisplayModeStandalone || isIosStandalone;
}

const IOS_INSTRUCTIONS = [
	{
		step: 1,
		icon: Share2,
		text: 'Tap the Share button in Safari.',
	},
	{
		step: 2,
		icon: PlusSquare,
		text: 'Select "Add to Home Screen".',
	},
	{
		step: 3,
		icon: Check,
		text: 'Tap "Add".',
	},
] as const;

const CHROMIUM_FALLBACK_DELAY_MS = 2000;

export function PWAInstallPrompt() {
	const dispatch = useAppDispatch();
	const isInstalled = useAppSelector(selectIsInstalled);
	const canShowPrompt = useAppSelector(selectCanShowPrompt);

	const [mounted, setMounted] = useState(false);
	const [pwaHydrated, setPwaHydrated] = useState(false);
	const [open, setOpen] = useState(false);
	const [promptVariant, setPromptVariant] = useState<PromptVariant | null>(
		null,
	);
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [isInstalling, setIsInstalling] = useState(false);
	const [chromiumFallbackReady, setChromiumFallbackReady] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const storageKey = getPwaStorageKeyFromWindow();

		try {
			const serialized = window.localStorage.getItem(storageKey);
			if (serialized) {
				dispatch(hydratePwaState(JSON.parse(serialized) as PwaState));
			} else {
				dispatch(
					hydratePwaState({
						installed: false,
						dismissedUntil: null,
					}),
				);
			}
		} catch (error) {
			console.warn('Failed to hydrate PWA state', error);
			dispatch(
				hydratePwaState({
					installed: false,
					dismissedUntil: null,
				}),
			);
		}

		setPwaHydrated(true);
	}, [mounted, dispatch]);

	useEffect(() => {
		if (!mounted) return;

		const existing = getDeferredInstallPrompt();
		if (existing) {
			setDeferredPrompt(existing);
		}

		return subscribeToInstallPrompt((prompt) => {
			setDeferredPrompt(prompt);
		});
	}, [mounted]);

	useEffect(() => {
		if (!mounted) return;

		if (isStandaloneMode()) {
			dispatch(setInstalled());
			return;
		}

		const mediaQuery = window.matchMedia('(display-mode: standalone)');
		const handleDisplayModeChange = () => {
			if (isStandaloneMode()) {
				dispatch(setInstalled());
			}
		};

		const handleAppInstalled = () => {
			dispatch(setInstalled());
			clearDeferredInstallPrompt();
			setDeferredPrompt(null);
			setOpen(false);
			setPromptVariant(null);
		};

		mediaQuery.addEventListener('change', handleDisplayModeChange);
		window.addEventListener('appinstalled', handleAppInstalled);

		return () => {
			mediaQuery.removeEventListener('change', handleDisplayModeChange);
			window.removeEventListener('appinstalled', handleAppInstalled);
		};
	}, [mounted, dispatch]);

	useEffect(() => {
		if (!mounted || !pwaHydrated) return;
		if (isInstalled || !canShowPrompt) {
			setChromiumFallbackReady(false);
			setOpen(false);
			setPromptVariant(null);
			return;
		}

		if (isIOSDevice() && !isStandaloneMode()) {
			setPromptVariant('ios');
			setOpen(true);
			return;
		}

		if (deferredPrompt) {
			setChromiumFallbackReady(false);
			setPromptVariant('chromium');
			setOpen(true);
			return;
		}

		setOpen(false);
		setPromptVariant(null);

		const timer = window.setTimeout(() => {
			setChromiumFallbackReady(true);
		}, CHROMIUM_FALLBACK_DELAY_MS);

		return () => window.clearTimeout(timer);
	}, [mounted, pwaHydrated, isInstalled, canShowPrompt, deferredPrompt]);

	useEffect(() => {
		if (!mounted || !pwaHydrated || isInstalled || !canShowPrompt) return;
		if (isIOSDevice() || deferredPrompt) return;

		if (chromiumFallbackReady) {
			setPromptVariant('chromium');
			setOpen(true);
		}
	}, [
		mounted,
		pwaHydrated,
		isInstalled,
		canShowPrompt,
		deferredPrompt,
		chromiumFallbackReady,
	]);

	const handleInstall = useCallback(async () => {
		if (!deferredPrompt) return;

		setIsInstalling(true);

		try {
			await deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;

			if (outcome === 'accepted') {
				dispatch(setInstalled());
			}
		} catch (error) {
			console.warn('PWA install prompt failed', error);
		} finally {
			clearDeferredInstallPrompt();
			setDeferredPrompt(null);
			setIsInstalling(false);
			setOpen(false);
			setPromptVariant(null);
		}
	}, [deferredPrompt, dispatch]);

	const handleMaybeLater = useCallback(() => {
		dispatch(dismissFor15Days());
		setOpen(false);
		setPromptVariant(null);
	}, [dispatch]);

	const handleGotIt = useCallback(() => {
		setOpen(false);
		setPromptVariant(null);
	}, []);

	if (!mounted) return null;

	return (
		<AlertDialog
			open={open && promptVariant !== null}
			onOpenChange={(nextOpen) => {
				if (!nextOpen) {
					setOpen(false);
					setPromptVariant(null);
				}
			}}
		>
			<AlertDialogContent className="z-[200] max-w-[calc(100vw-2rem)] sm:max-w-md">
				{promptVariant === 'ios' ? (
					<>
						<AlertDialogHeader>
							<div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 sm:mx-0">
								<Smartphone
									className="size-6 text-primary"
									aria-hidden="true"
								/>
							</div>
							<AlertDialogTitle>Install App</AlertDialogTitle>
							<AlertDialogDescription>
								Install this app on your Home Screen for quick access.
							</AlertDialogDescription>
						</AlertDialogHeader>

						<ol className="space-y-3 rounded-lg border bg-muted/40 p-4">
							{IOS_INSTRUCTIONS.map(({ step, icon: Icon, text }) => (
								<li key={step} className="flex items-start gap-3 text-sm">
									<span
										className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
										aria-hidden="true"
									>
										{step}
									</span>
									<div className="flex min-w-0 flex-1 items-start gap-2 pt-0.5">
										<Icon
											className="mt-0.5 size-4 shrink-0 text-muted-foreground"
											aria-hidden="true"
										/>
										<span className="text-foreground/90">{text}</span>
									</div>
								</li>
							))}
						</ol>

						<AlertDialogFooter className="gap-2 sm:gap-2">
							<AlertDialogCancel
								onClick={handleMaybeLater}
								className="w-full sm:w-auto"
							>
								Maybe Later
							</AlertDialogCancel>
							<Button
								type="button"
								onClick={handleGotIt}
								className="w-full sm:w-auto"
							>
								Got It
							</Button>
						</AlertDialogFooter>
					</>
				) : promptVariant === 'chromium' ? (
					<>
						<AlertDialogHeader>
							<div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 sm:mx-0">
								<Smartphone
									className="size-6 text-primary"
									aria-hidden="true"
								/>
							</div>
							<AlertDialogTitle>Install App</AlertDialogTitle>
							<AlertDialogDescription>
								{deferredPrompt
									? 'Install this app for faster access, offline support, and an app-like experience.'
									: 'Install this app from your browser menu. Look for the install icon in the address bar, or open the browser menu and choose "Install app".'}
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter className="gap-2 sm:gap-2">
							<AlertDialogCancel
								onClick={handleMaybeLater}
								disabled={isInstalling}
								className="w-full sm:w-auto"
							>
								Maybe Later
							</AlertDialogCancel>
							{deferredPrompt ? (
								<AlertDialogAction
									onClick={(event) => {
										event.preventDefault();
										void handleInstall();
									}}
									disabled={isInstalling}
									className="w-full sm:w-auto"
								>
									{isInstalling ? (
										<Loader2
											className="size-4 animate-spin"
											aria-hidden="true"
										/>
									) : (
										<Download className="size-4" aria-hidden="true" />
									)}
									{isInstalling ? 'Installing...' : 'Install'}
								</AlertDialogAction>
							) : (
								<Button
									type="button"
									onClick={handleGotIt}
									className="w-full sm:w-auto"
								>
									Got It
								</Button>
							)}
						</AlertDialogFooter>
					</>
				) : null}
			</AlertDialogContent>
		</AlertDialog>
	);
}
