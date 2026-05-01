import { DbHeader, Loader9 } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { Suspense } from 'react';
import PageClient from './page.client';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Barcode Manage' },
];

export default function Page() {
	return (
		<Suspense fallback={<Loader9 />}>
			<SessionProvider>
				<DbHeader breadcrumb={breadcrumbItems} />
				<PageClient />
			</SessionProvider>
		</Suspense>
	);
}
