import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorProductPage } from '@/store/features/vendor/product';

const breadcrumbItems = [{ name: 'Dashboard', path: '/' }, { name: 'Product' }];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorProductPage />
		</SessionProvider>
	);
}
