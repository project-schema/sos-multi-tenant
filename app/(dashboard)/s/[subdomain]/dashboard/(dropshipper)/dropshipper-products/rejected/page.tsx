import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import DropshipperProductRejectPage from '@/store/features/dropshipper/product/dropshipper-product-reject-page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Product' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<DropshipperProductRejectPage />
		</SessionProvider>
	);
}
