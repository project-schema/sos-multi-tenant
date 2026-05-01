'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib';
import { ServiceContentCreate } from '@/store/features/admin/cms/service-content';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Service Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Service Content</CardTitle>}>
				<Card className={cn('max-w-2xl')}>
					<CardContent>
						<ServiceContentCreate />
					</CardContent>
				</Card>
			</Container1>
		</>
	);
}
