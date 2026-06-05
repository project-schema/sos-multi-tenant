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

export type iAdminManagerPermissions = typeof data;

const data = {
	id: 45,
	name: 'Admin',
	permissions: [
		{
			id: 1,
			name: 'dashboard',
		},
		{
			id: 2,
			name: 'alluser',
		},
		{
			id: 3,
			name: 'add-vendor',
		},
		{
			id: 4,
			name: 'all-vendor',
		},
		{
			id: 5,
			name: 'active-vendor',
		},
		{
			id: 6,
			name: 'pending-vendor',
		},
		{
			id: 7,
			name: 'add-affiliate',
		},
		{
			id: 8,
			name: 'all-affiliate',
		},
		{
			id: 9,
			name: 'active-affiliate',
		},
		{
			id: 10,
			name: 'pending-affiliate',
		},
		{
			id: 11,
			name: 'add-user',
		},
		{
			id: 12,
			name: 'all-user',
		},
		{
			id: 13,
			name: 'active-user',
		},
		{
			id: 14,
			name: 'pending-user',
		},
		{
			id: 15,
			name: 'all-products',
		},
		{
			id: 16,
			name: 'active-products',
		},
		{
			id: 17,
			name: 'pending-products',
		},
		{
			id: 18,
			name: 'edit-products',
		},
		{
			id: 19,
			name: 'rejected-product',
		},
		{
			id: 20,
			name: 'all-request',
		},
		{
			id: 21,
			name: 'active-request',
		},
		{
			id: 22,
			name: 'pending-request',
		},
		{
			id: 23,
			name: 'rejected-request',
		},
		{
			id: 24,
			name: 'category',
		},
		{
			id: 25,
			name: 'sub-category',
		},
		{
			id: 26,
			name: 'brand',
		},
		{
			id: 27,
			name: 'all-order',
		},
		{
			id: 28,
			name: 'order-hold',
		},
		{
			id: 29,
			name: 'order-pending',
		},
		{
			id: 30,
			name: 'order-received',
		},
		{
			id: 31,
			name: 'delivery-processing',
		},
		{
			id: 32,
			name: 'product-delivered',
		},
		{
			id: 33,
			name: 'order-cancel',
		},
		{
			id: 34,
			name: 'withdraw',
		},
		{
			id: 35,
			name: 'home-service',
		},
		{
			id: 36,
			name: 'organization',
		},
		{
			id: 37,
			name: 'it-service',
		},
		{
			id: 38,
			name: 'organization-two',
		},
		{
			id: 39,
			name: 'partner',
		},
		{
			id: 40,
			name: 'content',
		},
		{
			id: 41,
			name: 'home-update-content',
		},
		{
			id: 42,
			name: 'companions',
		},
		{
			id: 43,
			name: 'mission',
		},
		{
			id: 44,
			name: 'testimonial',
		},
		{
			id: 45,
			name: 'members',
		},
		{
			id: 46,
			name: 'abount-update-content',
		},
		{
			id: 47,
			name: 'general-update-content',
		},
		{
			id: 48,
			name: 'faq',
		},
		{
			id: 49,
			name: 'advertise-update-content',
		},
		{
			id: 50,
			name: 'service-update-content',
		},
		{
			id: 51,
			name: 'setting',
		},
		{
			id: 52,
			name: 'service-category',
		},
		{
			id: 53,
			name: 'service-sub-category',
		},
		{
			id: 54,
			name: 'support',
		},
		{
			id: 55,
			name: 'support-category',
		},
		{
			id: 56,
			name: 'support-problem-topic',
		},
		{
			id: 57,
			name: 'advertise-utility',
		},
		{
			id: 58,
			name: 'all-advertiser',
		},
		{
			id: 59,
			name: 'subscription',
		},
		{
			id: 60,
			name: 'users-response',
		},
		{
			id: 61,
			name: 'create-coupon',
		},
		{
			id: 62,
			name: 'active-coupon',
		},
		{
			id: 63,
			name: 'request-coupon',
		},
		{
			id: 64,
			name: 'rejected-coupon',
		},
		{
			id: 65,
			name: 'manage-service',
		},
		{
			id: 66,
			name: 'service-order',
		},
		{
			id: 67,
			name: 'membership',
		},
		{
			id: 68,
			name: 'role',
		},
	],
};
