import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPosSalesPage } from '@/store/features/vendor/pos-sales';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'POS Sales' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPosSalesPage />
		</SessionProvider>
	);
}
