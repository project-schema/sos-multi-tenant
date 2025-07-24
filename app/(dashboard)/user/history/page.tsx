import { DbHeader } from '@/components/dashboard';
import { UserHistory } from '@/store/features';
import React from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'History' },
];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserHistory />
		</>
	);
}
