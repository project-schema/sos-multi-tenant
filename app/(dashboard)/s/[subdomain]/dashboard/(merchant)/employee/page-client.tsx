'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorEmployeePage } from '@/store/features/vendor/employee';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Employee' },
];

export default function PageClient() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorEmployeePage />
		</SessionProvider>
	);
}

