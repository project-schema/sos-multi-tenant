import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPurchaseInvoicePage } from '@/store/features/vendor/purchase/vendor-purchase-invoice-page';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'All Purchases', path: '/purchase' },
	{ name: 'Purchase Invoice' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPurchaseInvoicePage />
		</SessionProvider>
	);
}
