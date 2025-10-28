import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorProductOrderPage } from '@/store/features/vendor/product-order';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Product', path: '/product' },
	{ name: 'Product Order' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorProductOrderPage />
		</SessionProvider>
	);
}
