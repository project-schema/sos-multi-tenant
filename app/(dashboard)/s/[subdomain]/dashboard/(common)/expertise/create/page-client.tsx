'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorServicesCreate } from '@/store/features/vendor/services';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/dashboard/expertise' },
	{ name: 'Create' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorServicesCreate />
		</SessionProvider>
	);
}
