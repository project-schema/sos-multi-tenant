'use client';

import { DbHeader } from '@/components/dashboard';
import { UserSupportPage } from '@/store/features/user/support';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/user' },
	{ name: 'Support' },
];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserSupportPage />
		</>
	);
}
