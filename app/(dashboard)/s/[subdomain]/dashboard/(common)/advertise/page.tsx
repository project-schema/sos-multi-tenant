import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorAdvertisePage } from '@/store/features/vendor/advertise';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Advertise' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorAdvertisePage />
		</SessionProvider>
	);
}
