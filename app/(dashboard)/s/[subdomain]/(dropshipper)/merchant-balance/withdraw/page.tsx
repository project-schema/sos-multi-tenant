import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Balance', path: '/merchant-balance' },
	{ name: 'Withdraw' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div> Withdraw</div>
		</SessionProvider>
	);
}
