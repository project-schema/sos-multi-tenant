'use client';

import { DbHeader } from '@/components/dashboard';
import { SessionProvider } from '@/provider';
import DropshipperProductActivePage from '@/store/features/dropshipper/product/dropshipper-product-active-page';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Product' },
];

export default function Page() {
	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<DropshipperProductActivePage status="active" />
		</SessionProvider>
	);
}
