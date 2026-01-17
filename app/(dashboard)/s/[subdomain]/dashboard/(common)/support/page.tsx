import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorSupportPage } from '@/store/features/vendor/support';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Support' },
];
export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />

			<VendorSupportPage />
		</SessionProvider>
	);
}
