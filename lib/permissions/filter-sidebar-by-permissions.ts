import {
	getRequiredPermission,
	hasMerchantPermission,
} from '@/lib/permissions/merchant-route-permissions';
import { sidebarItem } from '@/components/dashboard/sidebar/sidebar.type';

function isUrlAllowed(
	url: string | undefined,
	permissions: Record<string, string>,
): boolean {
	if (!url) return false;
	const required = getRequiredPermission(url);
	if (!required) return true;
	return hasMerchantPermission(permissions, required);
}

export function filterSidebarByPermissions(
	items: sidebarItem[],
	permissions: Record<string, string>,
): sidebarItem[] {
	return items
		.map((item) => {
			const filteredSubItems = item.items?.filter((sub) =>
				isUrlAllowed(sub.url, permissions),
			);

			if (item.items?.length) {
				if (filteredSubItems && filteredSubItems.length > 0) {
					return { ...item, items: filteredSubItems };
				}
				if (item.url && isUrlAllowed(item.url, permissions)) {
					return { ...item, items: undefined };
				}
				return null;
			}

			if (item.url && isUrlAllowed(item.url, permissions)) {
				return item;
			}

			return null;
		})
		.filter((item): item is sidebarItem => item !== null);
}
