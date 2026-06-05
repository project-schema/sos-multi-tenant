'use client';

import { MerchantPermissionGuard } from '@/components/guards/merchant-permission-guard';

export default function MerchantLayoutClient({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MerchantPermissionGuard enabled>{children}</MerchantPermissionGuard>;
}
