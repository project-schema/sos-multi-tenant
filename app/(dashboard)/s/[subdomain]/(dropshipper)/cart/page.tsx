import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';

const breadcrumbItems = [{ name: 'Dashboard', path: '/' }, { name: 'Cart' }];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div>Card Page</div>
		</SessionProvider>
	);
}
