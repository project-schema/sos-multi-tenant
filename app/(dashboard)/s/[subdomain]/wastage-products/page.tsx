import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorWastageProductsPage } from '@/store/features/vendor/wastage-products';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Wastage Products' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorWastageProductsPage />
		</SessionProvider>
	);
}
