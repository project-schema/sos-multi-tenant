'use client';

import { DbHeader } from '@/components/dashboard';
import { Card } from '@/components/ui/card';
import { Suspense } from 'react';
import { SuspensePage } from './suspense-page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Advertise Utilities' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<Suspense fallback={<div>Loading tab controls...</div>}>
						<SuspensePage>{children}</SuspensePage>
					</Suspense>
				</Card>
			</div>
		</>
	);
}
