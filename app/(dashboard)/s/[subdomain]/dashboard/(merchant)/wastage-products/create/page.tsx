import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorWastageProductsCreatePage } from '@/store/features/vendor/wastage-products';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Wastage Products', path: '/wastage-products' },
	{ name: 'Wastage Products Create' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorWastageProductsCreatePage />
		</SessionProvider>
	);
}
