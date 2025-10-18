import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorAdvertiseCreate } from '@/store/features/vendor/advertise';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Advertise', path: '/advertise' },
	{ name: 'Create Advertise' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorAdvertiseCreate />
		</SessionProvider>
	);
}
