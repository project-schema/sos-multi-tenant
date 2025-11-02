import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import CartPageClient from './page.client';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Cart' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<CartPageClient />
		</SessionProvider>
	);
}
