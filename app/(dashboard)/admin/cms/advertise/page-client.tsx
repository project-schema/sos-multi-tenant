'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { AdvertiseContentCreate } from '@/store/features/admin/cms/advertise-content';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Advertise Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Advertise Content</CardTitle>}>
				<Card>
					<CardContent>
						<AdvertiseContentCreate />
					</CardContent>
				</Card>
			</Container1>
		</>
	);
}
