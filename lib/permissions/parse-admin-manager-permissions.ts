import { iAdminManagerPermissions } from '@/store/features/admin/role-permission/role-permission-type';

export function isFullAdminRole(roleName?: string | null): boolean {
	return roleName?.trim().toLowerCase() === 'admin';
}

export function parseAdminManagerPermissions(
	data: iAdminManagerPermissions | null | undefined,
): Record<string, string> {
	if (!data?.permissions?.length) return {};

	return Object.fromEntries(
		data.permissions.map((permission) => [permission.name, '1']),
	);
}
