import { vendorPermissionKeys } from '@/lib/data/role-permission';

export type Route = {
	id: string;
	parentId: string;
	name: string;
	path: string;
	checked: boolean;
};

export type PermissionGroup = {
	id: string;
	title: string;
	checked: boolean;
	routes: Route[];
};

export interface APIRes {
	name: string | null;
	permission: string | null;
}

export interface State {
	permissionData: PermissionGroup[];
	role: string;
	apiRes: APIRes;
}

export type Action =
	| {
			type: 'INPUT';
			payload: {
				name: keyof State;
				value: string;
			};
	  }
	| {
			type: 'GET_USER_PERMISSION';
			payload: {
				name: string;
				permissions: {
					name: string;
				}[];
			};
	  }
	| {
			type: 'CHECKED';
			payload: {
				id: string;
				value: boolean;
			};
	  }
	| {
			type: 'CHECKED_PARENT';
			payload: {
				parentId: string;
				value: boolean;
			};
	  }
	| {
			type: 'CLEAR_ALL_CHECKED';
	  }
	| {
			type: 'API_VALIDATION';
			payload: APIRes;
	  };

export type iVendorEmployeeRole = {
	id: number;
	name: string;
	guard_name: string;
	created_at: string;
	updated_at: string;
};

export interface IVendorEmployeeRoleSingleRes {
	status: number;
	role: IVendorEmployeeRole;
}

type PermissionFields = {
	[K in keyof typeof vendorPermissionKeys]: 1 | null;
};

export type IVendorEmployeeRole = {
	id: number;
	name: string;
	user_id: string;
	vendor_id: number;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
} & PermissionFields;
