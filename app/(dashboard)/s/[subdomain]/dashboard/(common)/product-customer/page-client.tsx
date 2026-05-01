import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorRegisterCustomerPage } from '@/store/features/vendor/product-customer';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Register Customers' },
];

export default async function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorRegisterCustomerPage />
		</SessionProvider>
	);
}
