import { PWA_MANIFEST_ICONS, PWA_MANIFEST_SCREENSHOTS } from '@/lib/pwa-icons';
import { getSubdomainFromHostname } from '@/lib/pwa-scope';
import { fetchPwaTenantBranding } from '@/lib/pwa-tenant';
import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

const DEFAULT_MANIFEST = {
	name: 'SOS Management',
	short_name: 'SOS',
	description: 'SOS Management — manage your business on the go.',
	theme_color: '#0060eb',
};

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const headersList = await headers();
	const host = headersList.get('host') ?? 'localhost';
	const hostname = host.split(':')[0];
	const subdomain = getSubdomainFromHostname(hostname);

	let name = DEFAULT_MANIFEST.name;
	let short_name = DEFAULT_MANIFEST.short_name;
	let description = DEFAULT_MANIFEST.description;
	let theme_color = DEFAULT_MANIFEST.theme_color;

	if (subdomain) {
		const branding = await fetchPwaTenantBranding(subdomain);
		if (branding) {
			name = branding.name;
			short_name = branding.shortName;
			description = branding.description;
			theme_color = branding.themeColor;
		}
	}

	return {
		id: '/',
		name,
		short_name,
		description,
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color,
		orientation: 'portrait-primary',
		scope: '/',
		icons: PWA_MANIFEST_ICONS,
		screenshots: PWA_MANIFEST_SCREENSHOTS,
	};
}
