import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorServicesPurchasePage } from '@/store/features/vendor/services';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Services', path: '/services' },
	{ name: 'Purchase' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorServicesPurchasePage />
		</SessionProvider>
	);
}
