import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'SOS Management',
		short_name: 'SOS',
		description: 'SOS Management — manage your business on the go.',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#0060eb',
		orientation: 'portrait-primary',
		scope: '/',
		icons: [
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
		],
	};
}
