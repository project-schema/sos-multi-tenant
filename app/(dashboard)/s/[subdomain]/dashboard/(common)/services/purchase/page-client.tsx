import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorServicesPurchasePage } from '@/store/features/vendor/services-purchase/page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
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
