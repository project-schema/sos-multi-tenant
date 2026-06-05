'use client';

import { Loader9 } from '@/components/dashboard';
import {
	getRequiredPermission,
	hasMerchantPermission,
	isMerchantPublicRoute,
} from '@/lib/permissions/merchant-route-permissions';
import {
	isTenantEmployeePermissions,
	isTenantEmployeeUser,
	parseEmployeePermissions,
} from '@/lib/permissions/parse-employee-permissions';
import { useVendorEmployeePermissionsQuery } from '@/store/features/vendor/employee/vendor-employee-api-slice';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

type MerchantPermissionGuardProps = {
	children: React.ReactNode;
	/** When false, children render without permission checks (e.g. dropshipper on common routes) */
	enabled?: boolean;
};

export function MerchantPermissionGuard({
	children,
	enabled = true,
}: MerchantPermissionGuardProps) {
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const router = useRouter();
	const didRedirect = useRef(false);

	const merchantGuard =
		enabled && status === 'authenticated' && session?.tenant_type === 'merchant';

	const { data: permissionsRes, isLoading: permissionsLoading } =
		useVendorEmployeePermissionsQuery(undefined, {
			skip: !merchantGuard,
		});

	const isEmployee =
		isTenantEmployeeUser(session?.user) ||
		isTenantEmployeePermissions(permissionsRes);

	const guardActive = merchantGuard && isEmployee;

	const permissions = useMemo(
		() => parseEmployeePermissions(permissionsRes),
		[permissionsRes],
	);

	const requiredPermission = useMemo(
		() => getRequiredPermission(pathname),
		[pathname],
	);

	const isLoading = status === 'loading' || (merchantGuard && permissionsLoading);

	const isAllowed = useMemo(() => {
		if (!guardActive) return true;
		if (isMerchantPublicRoute(pathname)) return true;
		if (!requiredPermission) return true;
		return hasMerchantPermission(permissions, requiredPermission);
	}, [guardActive, pathname, requiredPermission, permissions]);

	useEffect(() => {
		didRedirect.current = false;
	}, [pathname]);

	useEffect(() => {
		if (isLoading || isAllowed || didRedirect.current) return;

		didRedirect.current = true;
		toast.error('You do not have permission to access this page.');
		router.replace('/dashboard');
	}, [isLoading, isAllowed, router, pathname]);

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
