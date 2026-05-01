'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { GeneralContentCreate } from '@/store/features/admin/cms/general-content';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'General Content' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>General Content</CardTitle>}>
				<Card>
					<CardContent>
						<GeneralContentCreate />
					</CardContent>
				</Card>
			</Container1>
		</>
	);
}
