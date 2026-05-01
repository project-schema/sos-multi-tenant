'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
	ITServiceCreate,
	ITServiceTable,
} from '@/store/features/admin/cms/it-service';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'All IT Service' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>All IT Service</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-1">
						<CardContent>
							<ITServiceCreate />
						</CardContent>
					</Card>
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<ITServiceTable />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
