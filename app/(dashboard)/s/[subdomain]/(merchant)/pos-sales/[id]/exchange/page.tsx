import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPosSalesOrderExchangePage } from '@/store/features/vendor/pos-sales';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'POS Sales', path: '/pos-sales' },
	{ name: 'POS Sales Exchange' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPosSalesOrderExchangePage />
		</SessionProvider>
	);
}
