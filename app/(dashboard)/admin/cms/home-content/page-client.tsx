'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { HomeContentCreate } from '@/store/features/admin/cms/home-content';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Home Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Home Content</CardTitle>}>
				<Card>
					<CardContent>
						<HomeContentCreate />
					</CardContent>
				</Card>
			</Container1>
		</>
	);
}
