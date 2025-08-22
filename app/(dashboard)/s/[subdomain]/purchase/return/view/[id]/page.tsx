import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPurchaseReturnViewPage } from '@/store/features/vendor/purchase/vendor-purchase-return-view-page';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'All Purchases', path: '/purchase' },
	{ name: 'Purchase Return', path: '/purchase/return' },
	{ name: 'View' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPurchaseReturnViewPage />
		</SessionProvider>
	);
}
