import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Merchant Orders' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div>Merchant Orders</div>
		</SessionProvider>
	);
}
