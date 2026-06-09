'use client';

import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import { PWARegister } from '@/components/pwa-register';

export function PWAStorefrontClient() {
	return (
		<>
			<PWARegister />
			<PWAInstallPrompt />
		</>
	);
}
