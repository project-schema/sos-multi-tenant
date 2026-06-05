export type iTenantEmployeePermissionsResponse = {
	role_type?: string;
	role?: Record<string, unknown>;
	permissions?: Record<string, unknown>;
	tenant_type?: string;
};

const ROLE_OBJECT_META_KEYS = new Set([
	'id',
	'name',
	'user_id',
	'vendor_id',
	'guard_name',
	'created_at',
	'updated_at',
	'deleted_at',
]);

export function isPermissionGranted(value: unknown): boolean {
	return value === 1 || value === '1' || value === true;
}

export function isTenantEmployeeUser(
	user?: { is_employee?: unknown; role_type?: string } | null
): boolean {
	if (!user) return false;
	return (
		user.role_type === 'employee' ||
		user.is_employee === 1 ||
		user.is_employee === '1' ||
		user.is_employee === true
	);
}

export function isTenantEmployeePermissions(
	data?: iTenantEmployeePermissionsResponse | null
): boolean {
	return data?.role_type === 'employee';
}

function parseRolePermissionObject(
	payload: Record<string, unknown>
): Record<string, string> {
	return Object.fromEntries(
		Object.entries(payload)
			.filter(
				([key, value]) =>
					!ROLE_OBJECT_META_KEYS.has(key) && isPermissionGranted(value)
			)
			.map(([key]) => [key, '1'])
	);
}

/** Normalize tenant-employee/permissions API: { role_type, role, permissions } */
export function parseEmployeePermissions(
	data: unknown
): Record<string, string> {
	if (!data || typeof data !== 'object') return {};

	const obj = data as iTenantEmployeePermissionsResponse;

	if (Array.isArray(obj.permissions)) {
		return Object.fromEntries(
			(obj.permissions as { name: string }[]).map((p) => [p.name, '1'])
		);
	}

	if (obj.permissions && typeof obj.permissions === 'object') {
		return parseRolePermissionObject(obj.permissions);
	}

	if (obj.role && typeof obj.role === 'object' && !Array.isArray(obj.role)) {
		return parseRolePermissionObject(obj.role);
	}

	return {};
}
