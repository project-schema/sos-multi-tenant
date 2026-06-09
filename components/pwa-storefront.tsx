import { PWAStorefrontClient } from '@/components/pwa-storefront-client';
import Script from 'next/script';

/**
 * Mounted only in storefront layouts (main frontend + tenant web).
 * Early SW registration helps Chrome show native "App available" on subdomains.
 */
export function PWAStorefront() {
	return (
		<>
			<Script id="pwa-sw-early" strategy="beforeInteractive">
				{`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'}).catch(function(){});}`}
			</Script>
			<PWAStorefrontClient />
		</>
	);
}
