import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPurchaseReturnTablePage } from '@/store/features/vendor/purchase/vendor-purchase-return-table-page';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'All Purchases', path: '/purchase' },
	{ name: 'Purchase Return' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPurchaseReturnTablePage />
		</SessionProvider>
	);
}
