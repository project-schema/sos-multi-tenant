import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Support', path: '/merchant-support' },
	{ name: 'Customer Chat' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div> Merchant Support Customer Chat</div>
		</SessionProvider>
	);
}
