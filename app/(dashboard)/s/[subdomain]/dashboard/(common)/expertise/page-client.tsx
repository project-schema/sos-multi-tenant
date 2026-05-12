'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { TenantServicesPage } from '@/store/features/service/product/tenant/tenant-services-page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<TenantServicesPage />
		</SessionProvider>
	);
}
