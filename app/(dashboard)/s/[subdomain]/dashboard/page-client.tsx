'use client';
import { DbHeader, Loader9 } from '@/components/dashboard';
import { MerchantPermissionGuard } from '@/components/guards/merchant-permission-guard';
import { SessionProvider } from '@/provider';
import { DropshipperDashboardPage } from '@/store/features/dropshipper/dashboard';
import { VendorDashboardPage } from '@/store/features/vendor/dashboard';
import { useSession } from 'next-auth/react';
const breadcrumbItems = [{ name: 'Dashboard' }];

export default function SubdomainPage({
	params,
}: {
	params: Promise<{ subdomain: string }>;
}) {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <Loader9 />;
	}

	const isDropshipper = session?.tenant_type === 'dropshipper';
	if (isDropshipper) {
		return (
			<SessionProvider>
				<DbHeader breadcrumb={breadcrumbItems} />
				<DropshipperDashboardPage />
			</SessionProvider>
		);
	} else {
		return (
			<SessionProvider>
				<DbHeader breadcrumb={breadcrumbItems} />
				<MerchantPermissionGuard enabled>
					<VendorDashboardPage />
				</MerchantPermissionGuard>
			</SessionProvider>
		);
	}
}
