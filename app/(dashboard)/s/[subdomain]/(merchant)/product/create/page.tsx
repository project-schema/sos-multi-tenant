import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorProductCreate } from '@/store/features/vendor/product';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Product Create' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorProductCreate />
		</SessionProvider>
	);
}
