import { PWAInstallPrompt } from '@/components/pwa-install-prompt';
import { PWARegister } from '@/components/pwa-register';
import { RootProviders } from '@/provider';
import type { Metadata, Viewport } from 'next';
import { Kalnia, Montserrat, Poppins } from 'next/font/google';
import 'react-quill-new/dist/quill.snow.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './globals.css';

const poppins = Poppins({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const kalnia = Kalnia({
	variable: '--font-kalnia',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: {
		template: `%s | SOS`,
		default: 'SOS',
	},
	description: 'SOS Management',
	applicationName: 'SOS',
	manifest: '/manifest.webmanifest',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'SOS',
	},
	icons: {
		icon: [
			{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
		],
		apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#0060eb' },
		{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={` ${poppins.variable} ${kalnia.variable} ${montserrat.variable} antialiased`}
			>
				<RootProviders>
					{children}
					<PWARegister />
					<PWAInstallPrompt />
				</RootProviders>
			</body>
		</html>
	);
}
