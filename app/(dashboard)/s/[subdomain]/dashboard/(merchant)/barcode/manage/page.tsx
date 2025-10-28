import { DbHeader, Loader8 } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { Suspense } from 'react';
import PageClient from './page.client';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Barcode Manage' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Suspense fallback={<Loader8 />}>
				<PageClient />
			</Suspense>
		</SessionProvider>
	);
}
