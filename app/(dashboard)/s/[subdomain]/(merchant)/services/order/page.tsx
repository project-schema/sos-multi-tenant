import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorServicesOrderPage } from '@/store/features/vendor/services';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Services', path: '/services' },
	{ name: 'Order' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorServicesOrderPage />
		</SessionProvider>
	);
}
