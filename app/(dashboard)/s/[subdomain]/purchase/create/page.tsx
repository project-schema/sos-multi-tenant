import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorPurchaseCreate } from '@/store/features/vendor/purchase';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Product Purchase' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorPurchaseCreate />
		</SessionProvider>
	);
}
