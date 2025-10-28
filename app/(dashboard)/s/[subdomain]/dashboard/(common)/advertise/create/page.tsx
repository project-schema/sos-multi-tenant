import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { Suspense } from 'react';
import PageClient from './page.client';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Advertise', path: '/advertise' },
	{ name: 'Create Advertise' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Suspense fallback={<div>Loading...</div>}>
				<PageClient />
			</Suspense>
		</SessionProvider>
	);
}
