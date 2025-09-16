import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorDamageProductsCreatePage } from '@/store/features/vendor/damage-products';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Damage Products', path: '/damage-products' },
	{ name: 'Damage Products Create' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorDamageProductsCreatePage />
		</SessionProvider>
	);
}
