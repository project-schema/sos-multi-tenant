import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { UserHistory } from '@/store/features/vendor/recharge/user-history';
import { Metadata } from 'next';

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

export const metadata: Metadata = {
	title: 'My Wallet | History | SOS',
	description: 'SOS Management',
};
