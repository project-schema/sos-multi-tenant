'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPosSalesOrdersPage } from '@/store/features/vendor/pos-sales';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'POS Sales', path: '/dashboard/pos-sales' },
	{ name: 'POS Orders' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPosSalesOrdersPage />
		</SessionProvider>
	);
}
