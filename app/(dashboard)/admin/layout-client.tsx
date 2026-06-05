'use client';

import { AdminPermissionGuard } from '@/components/guards/admin-permission-guard';

export default function AdminLayoutClient({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AdminPermissionGuard>{children}</AdminPermissionGuard>;
}
