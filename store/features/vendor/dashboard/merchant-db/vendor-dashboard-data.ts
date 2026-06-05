export const vendorDashboardStats = {
	activeOrder: 128,
	pendingOrder: 42,
	todayOrder: 36,
	todaySell: 84500,
};

export const summaryMetrics = [
	{
		id: 'active',
		title: 'Active Order',
		value: 128,
		format: 'number' as const,
		change: '+24 orders vs last month',
		trend: 'up' as const,
		footer: 'Based on 1,240 total orders',
	},
	{
		id: 'pending',
		title: 'Pending Order',
		value: 42,
		format: 'number' as const,
		change: '+8 orders vs last month',
		trend: 'up' as const,
		footer: 'Awaiting confirmation',
	},
	{
		id: 'today-order',
		title: 'Today Order',
		value: 36,
		format: 'number' as const,
		change: '-4 orders vs yesterday',
		trend: 'down' as const,
		footer: 'Updated just now',
	},
	{
		id: 'today-sell',
		title: 'Today Sell',
		value: 84500,
		format: 'currency' as const,
		change: '+12,400 Tk vs yesterday',
		trend: 'up' as const,
		footer: 'From 36 completed orders',
	},
];

export const weeklyRevenueData = [
	{ day: 'Mon', revenue: 12400, expenses: 4200 },
	{ day: 'Tue', revenue: 9800, expenses: 3100 },
	{ day: 'Wed', revenue: 15200, expenses: 5400 },
	{ day: 'Thu', revenue: 11800, expenses: 3900 },
	{ day: 'Fri', revenue: 18600, expenses: 6200 },
	{ day: 'Sat', revenue: 21400, expenses: 7100 },
	{ day: 'Sun', revenue: 16800, expenses: 4800 },
];

export const salesPipelineOrders = [
	{ month: 'Jul', value: 120 },
	{ month: 'Aug', value: 185 },
	{ month: 'Sep', value: 240 },
];

export const salesPipelineSales = [
	{ month: 'Jul', value: 420000 },
	{ month: 'Aug', value: 580000 },
	{ month: 'Sep', value: 720000 },
];

export const ordersOverviewData = [
	{ status: 'completed', orders: 420 },
	{ status: 'processing', orders: 185 },
	{ status: 'pending', orders: 98 },
	{ status: 'cancelled', orders: 47 },
];

export type RecentOrderPriority = 'high' | 'medium' | 'low';
export type RecentOrderStatus = 'paid' | 'pending' | 'overdue' | 'draft';

export type RecentOrder = {
	id: string;
	customerName: string;
	initials: string;
	date: string;
	amount: number;
	priority: RecentOrderPriority;
	status: RecentOrderStatus;
};

export const recentOrders: RecentOrder[] = [
	{
		id: 'ORD-00001',
		customerName: 'James Brown',
		initials: 'JB',
		date: 'Jan 5, 2025',
		amount: 12500,
		priority: 'high',
		status: 'paid',
	},
	{
		id: 'ORD-00002',
		customerName: 'Sarah Miller',
		initials: 'SM',
		date: 'Jan 6, 2025',
		amount: 8900,
		priority: 'medium',
		status: 'pending',
	},
	{
		id: 'ORD-00003',
		customerName: 'Michael Chen',
		initials: 'MC',
		date: 'Jan 6, 2025',
		amount: 15200,
		priority: 'high',
		status: 'overdue',
	},
	{
		id: 'ORD-00004',
		customerName: 'Emily Davis',
		initials: 'ED',
		date: 'Jan 7, 2025',
		amount: 4300,
		priority: 'low',
		status: 'draft',
	},
	{
		id: 'ORD-00005',
		customerName: 'Robert Wilson',
		initials: 'RW',
		date: 'Jan 7, 2025',
		amount: 22100,
		priority: 'high',
		status: 'paid',
	},
	{
		id: 'ORD-00006',
		customerName: 'Lisa Anderson',
		initials: 'LA',
		date: 'Jan 8, 2025',
		amount: 7600,
		priority: 'medium',
		status: 'paid',
	},
	{
		id: 'ORD-00007',
		customerName: 'David Taylor',
		initials: 'DT',
		date: 'Jan 8, 2025',
		amount: 11800,
		priority: 'medium',
		status: 'pending',
	},
	{
		id: 'ORD-00008',
		customerName: 'Jennifer Lee',
		initials: 'JL',
		date: 'Jan 9, 2025',
		amount: 5400,
		priority: 'low',
		status: 'paid',
	},
	{
		id: 'ORD-00009',
		customerName: 'Chris Martin',
		initials: 'CM',
		date: 'Jan 9, 2025',
		amount: 18900,
		priority: 'high',
		status: 'overdue',
	},
	{
		id: 'ORD-00010',
		customerName: 'Amanda White',
		initials: 'AW',
		date: 'Jan 10, 2025',
		amount: 9200,
		priority: 'medium',
		status: 'paid',
	},
	{
		id: 'ORD-00011',
		customerName: 'Kevin Harris',
		initials: 'KH',
		date: 'Jan 10, 2025',
		amount: 6700,
		priority: 'low',
		status: 'draft',
	},
	{
		id: 'ORD-00012',
		customerName: 'Nicole Clark',
		initials: 'NC',
		date: 'Jan 11, 2025',
		amount: 14300,
		priority: 'high',
		status: 'paid',
	},
	{
		id: 'ORD-00013',
		customerName: 'Brian Lewis',
		initials: 'BL',
		date: 'Jan 11, 2025',
		amount: 8100,
		priority: 'medium',
		status: 'pending',
	},
	{
		id: 'ORD-00014',
		customerName: 'Rachel Walker',
		initials: 'RW',
		date: 'Jan 12, 2025',
		amount: 19600,
		priority: 'high',
		status: 'paid',
	},
	{
		id: 'ORD-00015',
		customerName: 'Daniel Hall',
		initials: 'DH',
		date: 'Jan 12, 2025',
		amount: 4800,
		priority: 'low',
		status: 'pending',
	},
	{
		id: 'ORD-00016',
		customerName: 'Michelle Young',
		initials: 'MY',
		date: 'Jan 13, 2025',
		amount: 11200,
		priority: 'medium',
		status: 'paid',
	},
];

export const topSellingProducts = [
	{ rank: 1, name: 'Wireless Bluetooth Headphones', sold: 342, revenue: 102600 },
	{ rank: 2, name: 'Smart Watch Pro', sold: 289, revenue: 144500 },
	{ rank: 3, name: 'USB-C Fast Charger', sold: 256, revenue: 38400 },
	{ rank: 4, name: 'Laptop Stand Aluminum', sold: 198, revenue: 29700 },
	{ rank: 5, name: 'Mechanical Keyboard RGB', sold: 176, revenue: 88000 },
	{ rank: 6, name: 'Portable Power Bank 20000mAh', sold: 165, revenue: 41250 },
	{ rank: 7, name: 'Wireless Mouse Ergonomic', sold: 152, revenue: 22800 },
	{ rank: 8, name: 'HD Webcam 1080p', sold: 134, revenue: 40200 },
	{ rank: 9, name: 'Phone Case Premium', sold: 121, revenue: 12100 },
	{ rank: 10, name: 'Screen Protector Pack', sold: 108, revenue: 5400 },
];
