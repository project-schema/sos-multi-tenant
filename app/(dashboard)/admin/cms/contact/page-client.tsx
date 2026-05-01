'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ContactCreate } from '@/store/features/admin/cms/contact';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Contact Us' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Contact Us</CardTitle>}>
				<div className="grid lg:grid-cols-3 gap-4">
					<Card className="lg:col-span-2 overflow-hidden">
						<CardContent>
							<ContactCreate />
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
