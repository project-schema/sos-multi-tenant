import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPurchasePaymentTablePage } from '@/store/features/vendor/purchase';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'All Purchases', path: '/purchase' },
	{ name: 'Payment History' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPurchasePaymentTablePage />
		</SessionProvider>
	);
}
