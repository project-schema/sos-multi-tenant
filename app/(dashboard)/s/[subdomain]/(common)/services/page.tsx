import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorServicesPage } from '@/store/features/vendor/services';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Services' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorServicesPage />
		</SessionProvider>
	);
}
