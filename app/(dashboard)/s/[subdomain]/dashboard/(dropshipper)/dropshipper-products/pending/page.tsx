import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import DropshipperProductPendingPage from '@/store/features/dropshipper/product/dropshipper-product-pending-page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Product' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<DropshipperProductPendingPage />
		</SessionProvider>
	);
}
