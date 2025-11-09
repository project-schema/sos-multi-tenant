import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { UserAdvertisePage } from '@/store/features/user/advertise';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Advertise' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<UserAdvertisePage />
		</SessionProvider>
	);
}
