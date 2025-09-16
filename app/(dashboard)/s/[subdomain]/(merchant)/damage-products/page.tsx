import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorDamageProductsPage } from '@/store/features/vendor/damage-products';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Damage Products' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorDamageProductsPage />
		</SessionProvider>
	);
}
