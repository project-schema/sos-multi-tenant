import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import PageClient from './page.client';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Products', path: '/dropshipper-products' },
	{ name: 'Details' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<PageClient />
		</SessionProvider>
	);
}
