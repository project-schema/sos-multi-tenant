export type VendorDashboardMetric = {
	id: string;
	title: string;
	value: number;
	format: 'number' | 'currency';
	change: string;
	trend: 'up' | 'down';
	footer: string;
};

export type VendorWeeklyRevenue = {
	day: string;
	revenue: number;
	expenses: number;
};

export type VendorPipelinePoint = {
	month: string;
	value: number;
};

export type VendorOrderOverview = {
	status: string;
	orders: number;
};

export type VendorDashboardRecentOrder = {
	id: string;
	customerName: string;
	initials: string;
	date: string;
	amount: number;
	priority: 'high' | 'medium' | 'low';
	status: 'paid' | 'pending' | 'overdue' | 'draft';
};

export type VendorTopSellingProduct = {
	rank: number;
	name: string;
	sold: number;
	revenue: number;
};

export type VendorDashboardStatistics = {
	summaryMetrics: VendorDashboardMetric[];
	weeklyRevenueData: VendorWeeklyRevenue[];
	salesPipelineOrders: VendorPipelinePoint[];
	salesPipelineSales: VendorPipelinePoint[];
	ordersOverviewData: VendorOrderOverview[];
	recentOrders: VendorDashboardRecentOrder[];
	topSellingProducts: VendorTopSellingProduct[];
};

export type VendorDashboardData = {
	status: number;
	data: VendorDashboardStatistics;
};
