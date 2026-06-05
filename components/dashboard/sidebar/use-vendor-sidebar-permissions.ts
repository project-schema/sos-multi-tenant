'use client';

import { filterSidebarByPermissions } from '@/lib/permissions/filter-sidebar-by-permissions';
import {
	isTenantEmployeePermissions,
	isTenantEmployeeUser,
	parseEmployeePermissions,
} from '@/lib/permissions/parse-employee-permissions';
import { useVendorEmployeePermissionsQuery } from '@/store/features/vendor/employee/vendor-employee-api-slice';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';
import { sidebarItem } from './sidebar.type';

export function useVendorSidebarPermissions() {
	const { data: session, status } = useSession();
	const isMerchant =
		status === 'authenticated' && session?.tenant_type === 'merchant';

	const { data: permissionsRes, isLoading } = useVendorEmployeePermissionsQuery(
		undefined,
		{ skip: !isMerchant },
	);

	const isEmployee =
		isTenantEmployeeUser(session?.user) ||
		isTenantEmployeePermissions(permissionsRes);

	const permissions = useMemo(
		() => parseEmployeePermissions(permissionsRes),
		[permissionsRes],
	);

	const filterByPermission = useCallback(
		(items: sidebarItem[]) => {
			if (!isEmployee) return items;
			if (isLoading) return [];
			return filterSidebarByPermissions(items, permissions);
		},
		[isEmployee, isLoading, permissions],
	);

	return { isEmployee, isLoading: isMerchant && isEmployee && isLoading, filterByPermission };
}
