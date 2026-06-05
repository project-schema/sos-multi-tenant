/** Routes employees can open without a permission key */
export const MERCHANT_PUBLIC_ROUTES = [
	'/dashboard',
	'/dashboard/auth',
	'/dashboard/profile',
] as const;

/**
 * Longest-prefix match: dashboard path → permission key (vendorRolePermissionData paths).
 * Sorted longest-first at runtime via getRequiredPermission.
 */
export const MERCHANT_ROUTE_PERMISSION_MAP: {
	path: string;
	permission: string;
}[] = [
	{ path: '/dashboard/employee/role-permissions', permission: 'employee' },
	{ path: '/dashboard/employee', permission: 'employee' },
	{ path: '/dashboard/product/create', permission: 'add_product' },
	{ path: '/dashboard/product-order', permission: 'all_order' },
	{ path: '/dashboard/product-customer', permission: 'customer' },
	{ path: '/dashboard/dropshipper-request', permission: 'affiliate_request' },
	{
		path: '/dashboard/pos-sales/payment-history',
		permission: 'payment_history_pos_sale',
	},
	{ path: '/dashboard/pos-sales/create', permission: 'add_pos_sale' },
	{ path: '/dashboard/pos-sales/return', permission: 'sale_return' },
	{ path: '/dashboard/pos-sales', permission: 'all_pos_sale' },
	{
		path: '/dashboard/purchase/payment-history',
		permission: 'payment_history_purchase',
	},
	{ path: '/dashboard/purchase/create', permission: 'add_purchase' },
	{ path: '/dashboard/purchase/return', permission: 'purchase_return' },
	{ path: '/dashboard/purchase', permission: 'all_purchase' },
	{ path: '/dashboard/barcode/generator', permission: 'barcode_generate' },
	{ path: '/dashboard/barcode/manage', permission: 'barcode_manage' },
	{ path: '/dashboard/damage-products/create', permission: 'create_damage' },
	{ path: '/dashboard/damage-products', permission: 'damage_list' },
	{ path: '/dashboard/wastage-products/create', permission: 'add_wastage' },
	{ path: '/dashboard/wastage-products', permission: 'all_wastage' },
	{ path: '/dashboard/sub-category', permission: 'sub_category' },
	{ path: '/dashboard/product-order', permission: 'order' },
	{ path: '/dashboard/order-source', permission: 'source' },
	{ path: '/dashboard/courier-company', permission: 'delivery_company' },
	{ path: '/dashboard/delivery-charge', permission: 'delivery_area' },
	{ path: '/dashboard/pickup-area', permission: 'pickup_area' },
	{ path: '/dashboard/delivery-area', permission: 'delivery_area' },
	{ path: '/dashboard/payment-methods', permission: 'payment_method' },
	{ path: '/dashboard/invoice-generate', permission: 'invoice_generate' },
	{ path: '/dashboard/woo-commerce', permission: 'setting' },
	{ path: '/dashboard/cms/blog-category', permission: 'cms_blog_category' },
	{ path: '/dashboard/cms/home-page', permission: 'cms_home_page' },
	{ path: '/dashboard/cms/system', permission: 'cms_system' },
	{ path: '/dashboard/cms/blog', permission: 'cms_blog' },
	{ path: '/dashboard/coupon/generate', permission: 'coupon' },
	{ path: '/dashboard/coupon', permission: 'coupon' },
	{
		path: '/dashboard/expertise/purchase-order',
		permission: 'all_service_order',
	},
	{ path: '/dashboard/expertise/purchase', permission: 'purchase_service' },
	{ path: '/dashboard/expertise/create', permission: 'create_service' },
	{ path: '/dashboard/expertise/order', permission: 'service_order' },
	{ path: '/dashboard/expertise', permission: 'all_service' },
	{ path: '/dashboard/support/create', permission: 'create_support' },
	{ path: '/dashboard/customer-chat', permission: 'chat' },
	{ path: '/dashboard/balance/recharge', permission: 'recharge' },
	{ path: '/dashboard/balance/history', permission: 'recharge_history' },
	{ path: '/dashboard/balance/withdraw', permission: 'withdraw' },
	{ path: '/dashboard/category', permission: 'category' },
	{ path: '/dashboard/variation', permission: 'variation' },
	{ path: '/dashboard/warehouse', permission: 'warehouse' },
	{ path: '/dashboard/supplier', permission: 'supplier' },
	{ path: '/dashboard/customer', permission: 'customer' },
	{ path: '/dashboard/advertise', permission: 'advertiser' },
	{ path: '/dashboard/membership', permission: 'membership' },
	{ path: '/dashboard/product', permission: 'products' },
	{ path: '/dashboard/report', permission: 'report' },
	{ path: '/dashboard/support', permission: 'all_support' },
	{ path: '/dashboard/brand', permission: 'brand' },
	{ path: '/dashboard/color', permission: 'color' },
	{ path: '/dashboard/profile', permission: 'setting' },
	{ path: '/dashboard/unit', permission: 'unit' },
];

const SORTED_ROUTES = [...MERCHANT_ROUTE_PERMISSION_MAP].sort(
	(a, b) => b.path.length - a.path.length
);

export function normalizeDashboardPath(pathname: string): string {
	const withoutSubdomain = pathname.replace(/^\/s\/[^/]+/, '');
	const path = withoutSubdomain || pathname;
	return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

export function isMerchantPublicRoute(pathname: string): boolean {
	const path = normalizeDashboardPath(pathname);
	return MERCHANT_PUBLIC_ROUTES.some((route) => path === route);
}

/** Returns permission key for path, or null if route is not restricted */
export function getRequiredPermission(pathname: string): string | null {
	const path = normalizeDashboardPath(pathname);

	if (isMerchantPublicRoute(path)) {
		return null;
	}

	for (const route of SORTED_ROUTES) {
		if (path === route.path || path.startsWith(`${route.path}/`)) {
			return route.permission;
		}
	}

	return null;
}

export function hasMerchantPermission(
	permissions: Record<string, unknown> | null | undefined,
	permissionKey: string
): boolean {
	if (!permissionKey) return true;
	if (!permissions) return false;

	const value = permissions[permissionKey];
	return value === '1' || value === 1 || value === true;
}
