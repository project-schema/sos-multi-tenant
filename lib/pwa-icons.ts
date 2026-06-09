import type { MetadataRoute } from 'next';

export const PWA_MANIFEST_ICONS: MetadataRoute.Manifest['icons'] = [
	{
		src: '/icons/icon-192.png',
		sizes: '192x192',
		type: 'image/png',
		purpose: 'any',
	},
	{
		src: '/icons/icon-512.png',
		sizes: '512x512',
		type: 'image/png',
		purpose: 'any',
	},
	{
		src: '/icons/icon-maskable-512.png',
		sizes: '512x512',
		type: 'image/png',
		purpose: 'maskable',
	},
];

export const PWA_METADATA_ICONS = {
	icon: [
		{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
		{ url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
	],
	apple: [
		{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
	],
};

export const PWA_MANIFEST_SCREENSHOTS: NonNullable<
	MetadataRoute.Manifest['screenshots']
> = [
	{
		src: '/screenshots/mobile.png',
		sizes: '390x844',
		type: 'image/png',
		form_factor: 'narrow',
		label: 'Mobile storefront',
	},
	{
		src: '/screenshots/desktop-wide.png',
		sizes: '1280x720',
		type: 'image/png',
		form_factor: 'wide',
		label: 'Desktop storefront',
	},
];
