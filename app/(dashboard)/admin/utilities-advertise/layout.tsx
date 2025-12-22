'use client';

import { DbHeader } from '@/components/dashboard';
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
			<Suspense fallback={<div>Loading tab controls...</div>}>
				<SuspensePage>{children}</SuspensePage>
			</Suspense>
		</>
	);
}
