import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import PageClient from './page.client';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Dropshipper Request' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<PageClient />
		</SessionProvider>
	);
}
