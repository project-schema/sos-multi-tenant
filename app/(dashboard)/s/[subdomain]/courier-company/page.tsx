import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorCourierCompanyPage } from '@/store/features/vendor/courier-company';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Courier Company' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorCourierCompanyPage />
		</SessionProvider>
	);
}
