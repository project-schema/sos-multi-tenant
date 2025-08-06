'use client';

import { DbHeader } from '@/components/dashboard';
import UserResponsesClient from '@/store/features/admin/user-responses/user-responses.index';
import { Suspense } from 'react';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'User Responses' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Suspense fallback={<div>Loading user responses...</div>}>
				<UserResponsesClient />
			</Suspense>
		</>
	);
}
