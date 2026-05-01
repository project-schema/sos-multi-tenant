'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { AdminManagerCreate } from '@/store/features/admin/manager-permissions/admin-manager-permissions-create';
import { AdminManagerTable } from '@/store/features/admin/manager-permissions/admin-manager-permissions-table';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Manager' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Manager</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<AdminManagerCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<AdminManagerTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
