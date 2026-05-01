import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorServicesPurchaseOrderPage } from '@/store/features/vendor/services-purchase/purchase-order-page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Services', path: '/services' },
	{ name: 'Order' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorServicesPurchaseOrderPage />
		</SessionProvider>
	);
}
