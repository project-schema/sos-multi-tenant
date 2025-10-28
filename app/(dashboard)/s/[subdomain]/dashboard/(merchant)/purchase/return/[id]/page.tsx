import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPurchaseReturnPage } from '@/store/features/vendor/purchase/vendor-purchase-return-page';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'All Purchases', path: '/purchase' },
	{ name: 'Purchase Return' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPurchaseReturnPage />
		</SessionProvider>
	);
}
