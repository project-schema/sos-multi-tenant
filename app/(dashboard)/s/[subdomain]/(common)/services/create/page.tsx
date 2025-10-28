import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorServicesCreate } from '@/store/features/vendor/services';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Services', path: '/services' },
	{ name: 'Create' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorServicesCreate />
		</SessionProvider>
	);
}
