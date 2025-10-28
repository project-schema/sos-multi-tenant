import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import DropShipperProductPage from '@/store/features/dropshipper/product/dropshipper-product-page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Product' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<DropShipperProductPage />
		</SessionProvider>
	);
}
