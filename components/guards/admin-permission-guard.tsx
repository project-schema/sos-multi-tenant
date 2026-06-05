'use client';

import { Loader9 } from '@/components/dashboard';
import {
	getRequiredAdminPermission,
	hasAdminPermission,
} from '@/lib/permissions/admin-route-permissions';
import {
	isFullAdminRole,
	parseAdminManagerPermissions,
} from '@/lib/permissions/parse-admin-manager-permissions';
import { useAdminGetManagerPermissionsQuery } from '@/store/features/admin/role-permission/role-permissions-api-slice';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

type AdminPermissionGuardProps = {
	children: React.ReactNode;
};

export function AdminPermissionGuard({ children }: AdminPermissionGuardProps) {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const router = useRouter();
	const didRedirect = useRef(false);

	const guardActive =
		status === 'authenticated' && session?.tenant_type === 'admin';

	const {
		data: permissionsRes,
		isLoading: permissionsLoading,
		isError,
	} = useAdminGetManagerPermissionsQuery(undefined, {
		skip: !guardActive,
	});

	const isFullAdmin = isFullAdminRole(permissionsRes?.name);

	const permissions = useMemo(
		() => parseAdminManagerPermissions(permissionsRes),
		[permissionsRes],
	);

	const requiredPermission = useMemo(
		() => getRequiredAdminPermission(pathname),
		[pathname],
	);

	const isLoading =
		status === 'loading' || (guardActive && permissionsLoading);

	const isAllowed = useMemo(() => {
		if (!guardActive) return true;
		if (isError) return false;
		if (!permissionsRes) return false;
		if (isFullAdmin) return true;
		if (!requiredPermission) return true;
		return hasAdminPermission(permissions, requiredPermission);
	}, [
		guardActive,
		isError,
		permissionsRes,
		isFullAdmin,
		requiredPermission,
		permissions,
	]);

	useEffect(() => {
		didRedirect.current = false;
	}, [pathname]);

	useEffect(() => {
		if (isLoading || isAllowed || didRedirect.current) return;

		didRedirect.current = true;
		toast.error('You do not have permission to access this page.');

		if (hasAdminPermission(permissions, 'dashboard')) {
			router.replace('/admin');
			return;
		}

		router.replace('/auth');
	}, [isLoading, isAllowed, router, pathname, permissions]);

	if (!guardActive) {
		return <>{children}</>;
	}

	if (isLoading) {
		return <Loader9 />;
	}

	if (!isAllowed) {
		return <Loader9 />;
	}

	return <>{children}</>;
}
