'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { UserHistory } from '@/store/features/vendor/recharge/user-history';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'History' },
];
export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserHistory />
		</SessionProvider>
	);
}
