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

export interface RolePermission {
	title: string;
	routes: {
		name: string;
		path: string;
	}[];
}

export interface APIRes {
	role: string | null;
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

export type iAdminRole = {
	id: number;
	name: string;
	guard_name: string;
	created_at: string;
	updated_at: string;
};

export type iAdminRoleSingleRes = {
	permissions: iAdminRole[];
} & iAdminRole;
