'use client';

import { DbHeader } from '@/components/dashboard';
import { Card } from '@/components/ui/card';
import { useQueryParams } from '@/hooks/useQueryParams';
import {
	AdminEmailSubTable,
	AdminUserMessageTable,
} from '@/store/features/admin/user-responses';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'User Responses' },
];

export default function Page() {
	const { getParam } = useQueryParams();
	const tab = getParam('tab');
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					{tab !== 'contact' && <AdminEmailSubTable />}
					{tab === 'contact' && <AdminUserMessageTable />}
				</Card>
			</div>
		</>
	);
}
