import { vendorRolePermissionData } from '@/lib/data/role-permission';
import { State } from './role-permission-type';

export const initialState: State = {
	permissionData: [...vendorRolePermissionData].map((e, ei) => ({
		id: ei.toString(),
		title: e.title,
		checked: false,
		routes: e.routes.map((x, i) => ({
			...x,
			id: `${ei}-${i}`,
			parentId: ei.toString(),
			checked: false,
		})),
	})),
	role: '',
	apiRes: {
		name: null,
		permission: null,
	},
};

