import { PermissionGroup, Route } from './role-permission-type';

export const checkedTotal = (permissionData: PermissionGroup[]): Route[] => {
	return permissionData.flatMap((group) => group.routes.filter((r) => r.checked));
};

/** Flat payload for tenant-role-permission store/update: { name, add_product: "1", ... } */
export const buildRolePermissionPayload = (
	name: string,
	checkedRoutes: Route[],
): Record<string, string> => {
	const payload: Record<string, string> = { name };

	checkedRoutes.forEach((route) => {
		payload[route.path] = '1';
	});

	return payload;
};

/** Update payload: checked = "1", unchecked = null (all permission keys included) */
export const buildRolePermissionUpdatePayload = (
	name: string,
	permissionData: PermissionGroup[],
): Record<string, string | null> => {
	const payload: Record<string, string | null> = { name };

	permissionData.forEach((group) => {
		group.routes.forEach((route) => {
			payload[route.path] = route.checked ? '1' : null;
		});
	});

	return payload;
};

const ROLE_META_KEYS = new Set([
	'id',
	'name',
	'guard_name',
	'created_at',
	'updated_at',
	'permissions',
	'status',
	'tenant_type',
]);

/** Parse show/update API role object into permission names for the reducer */
export const parseRolePermissionsFromApi = (
	role: Record<string, unknown>,
): { name: string; permissions: { name: string }[] } => {
	const name = String(role.name ?? '');

	if (Array.isArray(role.permissions)) {
		return {
			name,
			permissions: (role.permissions as { name: string }[]).map((p) => ({
				name: p.name,
			})),
		};
	}

	const permissions = Object.entries(role)
		.filter(
			([key, value]) =>
				!ROLE_META_KEYS.has(key) && (value === '1' || value === 1 || value === true),
		)
		.map(([key]) => ({ name: key }));

	return { name, permissions };
};

