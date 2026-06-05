/** Admin routes that do not require a permission key */
export const ADMIN_PUBLIC_ROUTES = ['/admin'] as const;

/**
 * Longest-prefix match: admin path → permission key (adminRolePermissionData paths).
 */
export const ADMIN_ROUTE_PERMISSION_MAP: {
	path: string;
	permission: string;
}[] = [
	{ path: '/admin/role-permissions', permission: 'role' },
	{ path: '/admin/manager-permissions', permission: 'role' },
	{ path: '/admin/cms/home-content', permission: 'home-update-content' },
	{ path: '/admin/cms/home-page', permission: 'content' },
	{ path: '/admin/cms/organization-two', permission: 'organization-two' },
	{ path: '/admin/cms/organization', permission: 'organization' },
	{ path: '/admin/cms/it-service', permission: 'it-service' },
	{ path: '/admin/cms/service-content', permission: 'service-update-content' },
	{ path: '/admin/cms/faq-advertise', permission: 'faq' },
	{ path: '/admin/cms/advertise', permission: 'advertise-update-content' },
	{ path: '/admin/cms/testimonial', permission: 'testimonial' },
	{ path: '/admin/cms/companions', permission: 'companions' },
	{ path: '/admin/cms/missions', permission: 'mission' },
	{ path: '/admin/cms/members', permission: 'members' },
	{ path: '/admin/cms/general', permission: 'general-update-content' },
	{ path: '/admin/cms/partner', permission: 'partner' },
	{ path: '/admin/cms/contact', permission: 'content' },
	{ path: '/admin/cms/social', permission: 'content' },
	{ path: '/admin/cms/service', permission: 'home-service' },
	{ path: '/admin/cms/about', permission: 'abount-update-content' },
	{ path: '/admin/service-sub-category', permission: 'service-sub-category' },
	{ path: '/admin/service-category', permission: 'service-category' },
	{ path: '/admin/support-sub-category', permission: 'support-problem-topic' },
	{ path: '/admin/support-category', permission: 'support-category' },
	{ path: '/admin/utilities-advertise', permission: 'advertise-utility' },
	{ path: '/admin/dropshipper-request', permission: 'all-request' },
	{ path: '/admin/merchant-product', permission: 'all-products' },
	{ path: '/admin/product-order', permission: 'all-order' },
	{ path: '/admin/service-order', permission: 'service-order' },
	{ path: '/admin/user-responses', permission: 'users-response' },
	{ path: '/admin/sub-category', permission: 'sub-category' },
	{ path: '/admin/coupon/rejected', permission: 'rejected-coupon' },
	{ path: '/admin/coupon/request', permission: 'request-coupon' },
	{ path: '/admin/coupon/active', permission: 'active-coupon' },
	{ path: '/admin/subscription', permission: 'subscription' },
	{ path: '/admin/membership', permission: 'membership' },
	{ path: '/admin/withdrawal', permission: 'withdraw' },
	{ path: '/admin/settings', permission: 'setting' },
	{ path: '/admin/advertise', permission: 'all-advertiser' },
	{ path: '/admin/support', permission: 'support' },
	{ path: '/admin/service', permission: 'manage-service' },
	{ path: '/admin/category', permission: 'category' },
	{ path: '/admin/users', permission: 'alluser' },
	{ path: '/admin/brand', permission: 'brand' },
];

const SORTED_ROUTES = [...ADMIN_ROUTE_PERMISSION_MAP].sort(
	(a, b) => b.path.length - a.path.length,
);

export function normalizeAdminPath(pathname: string): string {
	const withoutSubdomain = pathname.replace(/^\/s\/[^/]+/, '');
	const path = withoutSubdomain || pathname;
	return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

export function isAdminPublicRoute(pathname: string): boolean {
	const path = normalizeAdminPath(pathname);
	return ADMIN_PUBLIC_ROUTES.some((route) => path === route);
}

/** Returns permission key for path, or null if route is not restricted */
export function getRequiredAdminPermission(pathname: string): string | null {
	const path = normalizeAdminPath(pathname);

	if (isAdminPublicRoute(path)) {
		return 'dashboard';
	}

	for (const route of SORTED_ROUTES) {
		if (path === route.path || path.startsWith(`${route.path}/`)) {
			return route.permission;
		}
	}

	return null;
}

export function hasAdminPermission(
	permissions: Record<string, string> | null | undefined,
	permissionKey: string,
): boolean {
	if (!permissionKey) return true;
	if (!permissions) return false;
	return Boolean(permissions[permissionKey]);
}
