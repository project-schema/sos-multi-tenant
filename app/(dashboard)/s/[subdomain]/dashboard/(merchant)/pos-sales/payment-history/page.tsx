import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPosSalesPaymentPage } from '@/store/features/vendor/pos-sales';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'POS Sales', path: '/pos-sales' },
	{ name: 'Payment History' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPosSalesPaymentPage />
		</SessionProvider>
	);
}
