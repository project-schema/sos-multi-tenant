'use client';

import { MerchantPermissionGuard } from '@/components/guards/merchant-permission-guard';
import { useSession } from 'next-auth/react';

export default function CommonLayoutClient({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session } = useSession();
	const isMerchant = session?.tenant_type === 'merchant';

	return (
		<MerchantPermissionGuard enabled={isMerchant}>
			{children}
		</MerchantPermissionGuard>
	);
}
