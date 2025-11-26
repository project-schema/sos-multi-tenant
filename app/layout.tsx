import { RootProviders } from '@/provider';
import type { Metadata } from 'next';
import { Kalnia, Montserrat, Poppins } from 'next/font/google';
import 'react-quill-new/dist/quill.snow.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
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
	title: 'SOS',
	description: 'SOS Management',
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
				<RootProviders>{children}</RootProviders>
			</body>
		</html>
	);
}
