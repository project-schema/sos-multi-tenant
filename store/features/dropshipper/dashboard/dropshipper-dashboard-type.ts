export type DropshipperDashboardMetric = {
	id: string;
	title: string;
	value: number;
	format: 'number' | 'currency';
	change: string;
	trend: 'up' | 'down';
	footer: string;
};

export type DropshipperWeeklySales = {
	day: string;
	orders: number;
	revenue: number;
};

export type DropshipperPipelinePoint = {
	month: string;
	value: number;
};

export type DropshipperProductStatus = {
	status: string;
	count: number;
};

export type DropshipperRecentOrder = {
	id: string;
	customerName: string;
	initials: string;
	date: string;
	amount: number;
	product: string;
	status: string;
};

export type DropshipperDashboardStatistics = {
	summaryMetrics: DropshipperDashboardMetric[];
	weeklySalesData: DropshipperWeeklySales[];
	ordersPipeline: DropshipperPipelinePoint[];
	revenuePipeline: DropshipperPipelinePoint[];
	productStatusData: DropshipperProductStatus[];
	recentOrders: DropshipperRecentOrder[];
};

export type DropshipperDashboardData = {
	status: number;
	data: DropshipperDashboardStatistics;
};
