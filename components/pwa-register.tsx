'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const SW_URL = '/sw.js';
const SW_SCOPE = '/';
const UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000;

export function PWARegister() {
	const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
	const updateIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const refreshingRef = useRef(false);

	useEffect(() => {
		if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
			return;
		}

		let isMounted = true;

		const handleControllerChange = () => {
			if (refreshingRef.current) return;
			refreshingRef.current = true;
			window.location.reload();
		};

		const handleUpdateFound = (registration: ServiceWorkerRegistration) => {
			const newWorker = registration.installing;
			if (!newWorker) return;

			newWorker.addEventListener('statechange', () => {
				if (
					newWorker.state === 'installed' &&
					navigator.serviceWorker.controller &&
					isMounted
				) {
					toast.info('A new version is available.', {
						description: 'Reload to get the latest updates.',
						action: {
							label: 'Reload',
							onClick: () => {
								newWorker.postMessage({ type: 'SKIP_WAITING' });
							},
						},
						duration: Infinity,
					});
				}
			});
		};

		const unregisterLegacyWorkers = async () => {
			const registrations = await navigator.serviceWorker.getRegistrations();

			await Promise.all(
				registrations
					.filter(
						(registration) =>
							registration.scope !== SW_SCOPE ||
							registration.active?.scriptURL.endsWith(SW_URL) === false,
					)
					.map((registration) => registration.unregister()),
			);
		};

		const registerServiceWorker = async () => {
			try {
				await unregisterLegacyWorkers();

				const registration = await navigator.serviceWorker.register(SW_URL, {
					scope: SW_SCOPE,
					updateViaCache: 'none',
				});

				if (!isMounted) {
					await registration.unregister();
					return;
				}

				registrationRef.current = registration;
				handleUpdateFound(registration);

				updateIntervalRef.current = setInterval(() => {
					void registration.update();
				}, UPDATE_CHECK_INTERVAL_MS);
			} catch (error) {
				console.warn('Service worker registration failed:', error);
			}
		};

		navigator.serviceWorker.addEventListener(
			'controllerchange',
			handleControllerChange,
		);

		void registerServiceWorker();

		return () => {
			isMounted = false;

			if (updateIntervalRef.current) {
				clearInterval(updateIntervalRef.current);
				updateIntervalRef.current = null;
			}

			navigator.serviceWorker.removeEventListener(
				'controllerchange',
				handleControllerChange,
			);
		};
	}, []);

	return null;
}
