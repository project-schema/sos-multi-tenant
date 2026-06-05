'use client';

import { DbHeader } from '@/components/dashboard';
import { AdminDashboardPage } from '@/store/features/admin/dashboard';

const breadcrumbItems = [{ name: 'Dashboard' }];

export default function AdminPageClient() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<AdminDashboardPage />
		</>
	);
}
