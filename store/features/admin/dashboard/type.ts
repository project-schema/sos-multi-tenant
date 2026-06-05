export type AdminStatusCount = {
	label: string;
	count: number;
	color: string;
};

export type AdminTrendPoint = {
	month: string;
	value: number;
};

export type AdminUserTypeGroup = {
	type: 'Merchant' | 'Dropshipper' | 'User';
	total: number;
	statuses: AdminStatusCount[];
};

export type AdminModuleOverviewItem = {
	id: string;
	title: string;
	total: number;
	change: string;
	trend: string;
};

export type AdminMembershipTier = {
	tier: string;
	count: number;
};

export type AdminSubscriptionPlan = {
	plan: string;
	merchants: number;
	dropshippers: number;
};

export type AdminWithdrawRecent = {
	id: string;
	name: string;
	status: string;
	amount: string;
	date: string;
};

export type AdminDBModuleOverviewData = {
	status: number;
	data: {
		adminModuleOverview: AdminModuleOverviewItem[];
	};
	message?: string;
};

export type AdminDBUsersData = {
	status: number;
	data: {
		total: number;
		userTypeGroups: AdminUserTypeGroup[];
		registrationTrend: AdminTrendPoint[];
	};
	message?: string;
};

export type AdminDBProductsData = {
	status: number;
	data: {
		productStatuses: AdminStatusCount[];
	};
	message?: string;
};

export type AdminDBRequestsData = {
	status: number;
	data: {
		requestStatuses: AdminStatusCount[];
	};
	message?: string;
};

export type AdminDBOrdersData = {
	status: number;
	data: {
		orderStatuses: AdminStatusCount[];
	};
	message?: string;
};

export type AdminDBServicesData = {
	status: number;
	data: {
		serviceStatuses: AdminStatusCount[];
	};
	message?: string;
};

export type AdminDBServiceOrdersData = {
	status: number;
	data: {
		serviceOrderStatuses: AdminStatusCount[];
	};
	message?: string;
};

export type AdminDBAdvertiseData = {
	status: number;
	data: {
		advertiseStatuses: AdminStatusCount[];
	};
	message?: string;
};

export type AdminDBCouponsData = {
	status: number;
	data: {
		couponStatuses: AdminStatusCount[];
	};
	message?: string;
};

export type AdminDBMembershipData = {
	status: number;
	data: {
		membershipStatuses: AdminStatusCount[];
		membershipTierBreakdown: AdminMembershipTier[];
	};
	message?: string;
};

export type AdminDBSubscriptionData = {
	status: number;
	data: {
		subscriptionStatuses: AdminStatusCount[];
		subscriptionPlanBreakdown: AdminSubscriptionPlan[];
	};
	message?: string;
};

export type AdminDBSupportData = {
	status: number;
	data: {
		supportStatuses: AdminStatusCount[];
	};
	message?: string;
};

export type AdminDBWithdrawData = {
	status: number;
	data: {
		withdrawStatuses: AdminStatusCount[];
		withdrawRecent: AdminWithdrawRecent[];
	};
	message?: string;
};

export type AdminDBData = {
	moduleOverview: AdminDBModuleOverviewData;
	users: AdminDBUsersData;
	products: AdminDBProductsData;
	requests: AdminDBRequestsData;
	orders: AdminDBOrdersData;
	services: AdminDBServicesData;
	serviceOrders: AdminDBServiceOrdersData;
	advertise: AdminDBAdvertiseData;
	coupons: AdminDBCouponsData;
	membership: AdminDBMembershipData;
	subscription: AdminDBSubscriptionData;
	support: AdminDBSupportData;
	withdraw: AdminDBWithdrawData;
};
