'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import { VendorProductOrderDetailsPage } from '@/store/features/vendor/product-order';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Product Order', path: '/dashboard/product-order' },
	{ name: 'Order Details' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<VendorProductOrderDetailsPage />
		</SessionProvider>
	);
}
