import type { LucideIcon } from 'lucide-react';
import {
	BanknoteArrowDown,
	Crown,
	Headset,
	Megaphone,
	Package,
	PackageOpen,
	Percent,
	ShoppingBag,
	Sparkles,
	Users,
	Wrench,
} from 'lucide-react';

export type StatusCount = {
	label: string;
	count: number;
	color: string;
};

export type UserTypeGroup = {
	type: 'Merchant' | 'Dropshipper' | 'User';
	total: number;
	statuses: StatusCount[];
};

export type ModuleOverview = {
	id: string;
	title: string;
	total: number;
	icon: LucideIcon;
	change: string;
	trend: 'up' | 'down';
};

export type ModuleTrendPoint = { month: string; value: number };

export type ModuleTableRow = {
	id: string;
	name: string;
	status: string;
	amount?: string;
	date: string;
};

/** Top-level module totals */
export const adminModuleOverview: ModuleOverview[] = [
	{
		id: 'users',
		title: 'Users',
		total: 12458,
		icon: Users,
		change: '+4.8%',
		trend: 'up',
	},
	{
		id: 'products',
		title: 'Products',
		total: 8342,
		icon: Package,
		change: '+6.2%',
		trend: 'up',
	},
	{
		id: 'requests',
		title: 'Requests',
		total: 284,
		icon: PackageOpen,
		change: '+12 today',
		trend: 'up',
	},
	{
		id: 'orders',
		title: 'Orders',
		total: 5671,
		icon: ShoppingBag,
		change: '+18.4%',
		trend: 'up',
	},
	{
		id: 'services',
		title: 'Services',
		total: 1892,
		icon: Wrench,
		change: '+14.4%',
		trend: 'up',
	},
	{
		id: 'advertise',
		title: 'Advertise',
		total: 456,
		icon: Megaphone,
		change: '+9.2%',
		trend: 'up',
	},
	{
		id: 'coupons',
		title: 'Coupons',
		total: 328,
		icon: Percent,
		change: '+3.1%',
		trend: 'up',
	},
	{
		id: 'membership',
		title: 'Membership',
		total: 2140,
		icon: Crown,
		change: '+8.1%',
		trend: 'up',
	},
	{
		id: 'subscription',
		title: 'Subscription',
		total: 486,
		icon: Sparkles,
		change: '+17.9%',
		trend: 'up',
	},
	{
		id: 'support',
		title: 'Support',
		total: 156,
		icon: Headset,
		change: '-5.4%',
		trend: 'down',
	},
	{
		id: 'withdraw',
		title: 'Withdraw',
		total: 89,
		icon: BanknoteArrowDown,
		change: '+2.3%',
		trend: 'up',
	},
];

/* ─── Users: Merchant · Dropshipper · User ─── */
export const userTypeGroups: UserTypeGroup[] = [
	{
		type: 'Merchant',
		total: 486,
		statuses: [
			{ label: 'Active', count: 412, color: 'bg-emerald-500' },
			{ label: 'Pending', count: 52, color: 'bg-amber-500' },
			{ label: 'Blocked', count: 22, color: 'bg-red-500' },
		],
	},
	{
		type: 'Dropshipper',
		total: 892,
		statuses: [
			{ label: 'Active', count: 756, color: 'bg-emerald-500' },
			{ label: 'Pending', count: 98, color: 'bg-amber-500' },
			{ label: 'Blocked', count: 38, color: 'bg-red-500' },
		],
	},
	{
		type: 'User',
		total: 11080,
		statuses: [
			{ label: 'Active', count: 10240, color: 'bg-emerald-500' },
			{ label: 'Pending', count: 612, color: 'bg-amber-500' },
			{ label: 'Blocked', count: 228, color: 'bg-red-500' },
		],
	},
];

export const userRegistrationTrend: ModuleTrendPoint[] = [
	{ month: 'Jan', value: 820 },
	{ month: 'Feb', value: 940 },
	{ month: 'Mar', value: 1020 },
	{ month: 'Apr', value: 1150 },
	{ month: 'May', value: 1280 },
	{ month: 'Jun', value: 1410 },
];

/* ─── Products ─── */
export const productStatuses: StatusCount[] = [
	{ label: 'Active', count: 6890, color: 'bg-emerald-500' },
	{ label: 'Pending', count: 842, color: 'bg-amber-500' },
	{ label: 'Edit', count: 312, color: 'bg-blue-500' },
	{ label: 'Rejected', count: 298, color: 'bg-red-500' },
];

export const productMonthlyTrend: ModuleTrendPoint[] = [
	{ month: 'Jan', value: 620 },
	{ month: 'Feb', value: 710 },
	{ month: 'Mar', value: 840 },
	{ month: 'Apr', value: 920 },
	{ month: 'May', value: 1050 },
	{ month: 'Jun', value: 1180 },
];

/* ─── Dropshipper Requests ─── */
export const requestStatuses: StatusCount[] = [
	{ label: 'Active', count: 142, color: 'bg-emerald-500' },
	{ label: 'Pending', count: 68, color: 'bg-amber-500' },
	{ label: 'Rejected', count: 44, color: 'bg-red-500' },
	{ label: 'Expired', count: 30, color: 'bg-neutral-400' },
];

/* ─── Orders ─── */
export const orderStatuses: StatusCount[] = [
	{ label: 'Pending', count: 524, color: 'bg-amber-500' },
	{ label: 'Hold', count: 186, color: 'bg-orange-500' },
	{ label: 'Received', count: 892, color: 'bg-blue-500' },
	{ label: 'Processing', count: 640, color: 'bg-indigo-500' },
	{ label: 'Delivered', count: 2840, color: 'bg-emerald-500' },
	{ label: 'Return', count: 312, color: 'bg-purple-500' },
	{ label: 'Cancelled', count: 277, color: 'bg-red-500' },
];

export const orderMonthlyTrend: ModuleTrendPoint[] = [
	{ month: 'Jan', value: 420 },
	{ month: 'Feb', value: 510 },
	{ month: 'Mar', value: 580 },
	{ month: 'Apr', value: 640 },
	{ month: 'May', value: 720 },
	{ month: 'Jun', value: 810 },
];

/* ─── Services ─── */
export const serviceStatuses: StatusCount[] = [
	{ label: 'Active', count: 1542, color: 'bg-emerald-500' },
	{ label: 'Pending', count: 218, color: 'bg-amber-500' },
	{ label: 'Deactivate', count: 132, color: 'bg-neutral-400' },
];

export const serviceOrderStatuses: StatusCount[] = [
	{ label: 'Pending', count: 86, color: 'bg-amber-500' },
	{ label: 'Progress', count: 124, color: 'bg-blue-500' },
	{ label: 'Hold', count: 38, color: 'bg-orange-500' },
	{ label: 'Completed', count: 412, color: 'bg-emerald-500' },
	{ label: 'Cancelled', count: 28, color: 'bg-red-500' },
];

/* ─── Advertise ─── */
export const advertiseStatuses: StatusCount[] = [
	{ label: 'Running', count: 198, color: 'bg-emerald-500' },
	{ label: 'Pending', count: 142, color: 'bg-amber-500' },
	{ label: 'Paused', count: 68, color: 'bg-blue-500' },
	{ label: 'Rejected', count: 48, color: 'bg-red-500' },
];

/* ─── Coupons ─── */
export const couponStatuses: StatusCount[] = [
	{ label: 'Active', count: 186, color: 'bg-emerald-500' },
	{ label: 'Request', count: 92, color: 'bg-amber-500' },
	{ label: 'Rejected', count: 50, color: 'bg-red-500' },
];

/* ─── Membership ─── */
export const membershipStatuses: StatusCount[] = [
	{ label: 'Active', count: 1842, color: 'bg-emerald-500' },
	{ label: 'Expired', count: 198, color: 'bg-neutral-400' },
	{ label: 'Pending', count: 100, color: 'bg-amber-500' },
];

export const membershipTierBreakdown = [
	{ tier: 'Basic', count: 820 },
	{ tier: 'Standard', count: 640 },
	{ tier: 'Premium', count: 480 },
	{ tier: 'Enterprise', count: 200 },
];

/* ─── Subscription ─── */
export const subscriptionStatuses: StatusCount[] = [
	{ label: 'Active', count: 412, color: 'bg-emerald-500' },
	{ label: 'Expired', count: 48, color: 'bg-neutral-400' },
	{ label: 'Trial', count: 26, color: 'bg-blue-500' },
];

export const subscriptionPlanBreakdown = [
	{ plan: 'Starter', merchants: 142, dropshippers: 68 },
	{ plan: 'Business', merchants: 186, dropshippers: 42 },
	{ plan: 'Enterprise', merchants: 84, dropshippers: 12 },
];

/* ─── Support ─── */
export const supportStatuses: StatusCount[] = [
	{ label: 'Pending', count: 48, color: 'bg-amber-500' },
	{ label: 'Answered', count: 72, color: 'bg-blue-500' },
	{ label: 'Closed', count: 36, color: 'bg-emerald-500' },
];

/* ─── Withdraw ─── */
export const withdrawStatuses: StatusCount[] = [
	{ label: 'Pending', count: 24, color: 'bg-amber-500' },
	{ label: 'Approved', count: 48, color: 'bg-emerald-500' },
	{ label: 'Rejected', count: 17, color: 'bg-red-500' },
];

export const withdrawRecent: ModuleTableRow[] = [
	{
		id: 'WDR-089',
		name: 'Fashion Hub',
		status: 'Pending',
		amount: '৳ 125,000',
		date: 'Jun 4, 2026',
	},
	{
		id: 'WDR-088',
		name: 'TechStore BD',
		status: 'Approved',
		amount: '৳ 84,500',
		date: 'Jun 3, 2026',
	},
	{
		id: 'WDR-087',
		name: 'Green Mart',
		status: 'Rejected',
		amount: '৳ 32,000',
		date: 'Jun 2, 2026',
	},
	{
		id: 'WDR-086',
		name: 'Style Zone',
		status: 'Approved',
		amount: '৳ 56,200',
		date: 'Jun 1, 2026',
	},
];

export type TransactionStatus =
	| 'delivered'
	| 'shipped'
	| 'processing'
	| 'cancelled';

export const recentTransactions: {
	ref: string;
	buyer: string;
	total: number;
	status: TransactionStatus;
}[] = [
	{ ref: 'ORD-4521', buyer: 'Sarah Johnson', total: 284, status: 'delivered' },
	{ ref: 'ORD-4520', buyer: 'Mike Chen', total: 156, status: 'shipped' },
	{ ref: 'ORD-4519', buyer: 'Emily Davis', total: 92, status: 'processing' },
	{ ref: 'ORD-4518', buyer: 'James Wilson', total: 410, status: 'delivered' },
	{ ref: 'ORD-4517', buyer: 'Lisa Park', total: 68, status: 'cancelled' },
];

export const recentActivity = [
	{ title: 'New merchant registered', user: 'TechStore BD', time: '3 min ago' },
	{ title: 'Product pending approval', user: 'Fashion Hub', time: '12 min ago' },
	{ title: 'Dropshipper request submitted', user: 'Ali Express BD', time: '25 min ago' },
	{ title: 'Order marked delivered', user: 'Sarah Johnson', time: '1 hr ago' },
	{ title: 'Coupon request received', user: 'Green Mart', time: '2 hr ago' },
	{ title: 'Withdrawal pending review', user: 'Style Zone', time: '3 hr ago' },
	{ title: 'Support ticket answered', user: 'Emily Davis', time: '4 hr ago' },
	{ title: 'Subscription renewed', user: 'Mega Shop', time: '5 hr ago' },
];
