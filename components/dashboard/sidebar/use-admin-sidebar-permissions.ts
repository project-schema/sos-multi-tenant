'use client';

import { filterAdminSidebarByPermissions } from '@/lib/permissions/filter-admin-sidebar-by-permissions';
import {
	isFullAdminRole,
	parseAdminManagerPermissions,
} from '@/lib/permissions/parse-admin-manager-permissions';
import { useAdminGetManagerPermissionsQuery } from '@/store/features/admin/role-permission/role-permissions-api-slice';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';
import { sidebarItem } from './sidebar.type';

export function useAdminSidebarPermissions() {
	const { data: session, status } = useSession();
	const isAdmin =
		status === 'authenticated' && session?.tenant_type === 'admin';

	const { data: permissionsRes, isLoading } = useAdminGetManagerPermissionsQuery(
		undefined,
		{ skip: !isAdmin },
	);

	const isRestricted = isAdmin && !isFullAdminRole(permissionsRes?.name);

	const permissions = useMemo(
		() => parseAdminManagerPermissions(permissionsRes),
		[permissionsRes],
	);

	const filterByPermission = useCallback(
		(items: sidebarItem[]) => {
			if (!isRestricted) return items;
			if (isLoading) return [];
			return filterAdminSidebarByPermissions(items, permissions);
		},
		[isRestricted, isLoading, permissions],
	);

	return {
		isRestricted,
		isLoading: isRestricted && isLoading,
		filterByPermission,
	};
}
