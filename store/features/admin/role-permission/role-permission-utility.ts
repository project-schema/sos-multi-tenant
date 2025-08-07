import { PermissionGroup, Route } from './role-permission-type';

export const checkedTotal = (payload: PermissionGroup[]): Route[] => {
	return payload.flatMap((group) =>
		group.routes.filter((route) => route.checked)
	);
};
