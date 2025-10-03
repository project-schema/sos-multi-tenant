import { DbHeader } from '@/components/dashboard';
import { UserHistory } from '@/store/features/vendor/recharge/user-history';
import { Metadata } from 'next';

const breadcrumbItems = [{ name: 'Dashboard', path: '/' }, { name: 'History' }];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserHistory />
		</>
	);
}

export const metadata: Metadata = {
	title: 'My Wallet | History | SOS',
	description: 'SOS Management',
};
