import { DbHeader } from '@/components/dashboard';
import { VendorSupportPage } from '@/store/features/vendor/support';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Support' },
];
export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />

			<VendorSupportPage />
		</>
	);
}
