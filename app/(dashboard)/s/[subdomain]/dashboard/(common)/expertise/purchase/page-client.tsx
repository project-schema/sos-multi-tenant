import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { TenantServicesPurchasePage } from '@/store/features/service/tenant-purchase/tenant-purchase-page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/dashboard/expertise' },
	{ name: 'Purchase' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<TenantServicesPurchasePage />
		</SessionProvider>
	);
}
