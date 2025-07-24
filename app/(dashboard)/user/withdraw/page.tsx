import { DbHeader } from '@/components/dashboard';
import { UserWithdraw } from '@/store/features';
import React from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Withdraw' },
];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserWithdraw />
		</>
	);
}
