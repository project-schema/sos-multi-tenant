import type {
	ModuleTableRow,
	ModuleTrendPoint,
	StatusCount,
} from '../../admin/dashboard/admin-dashboard-data';
import type { LucideIcon } from 'lucide-react';
import {
	CreditCard,
	RotateCcw,
	ShoppingCart,
	Store,
	Users,
} from 'lucide-react';

export type PosOverviewStat = {
	id: string;
	title: string;
	total: number;
	icon: LucideIcon;
	change: string;
	trend: 'up' | 'down';
	href: string;
};

export const posOverviewStats: PosOverviewStat[] = [
	{
		id: 'customers',
		title: 'POS Customer',
		total: 248,
		icon: Users,
		change: '+12.4%',
		trend: 'up',
		href: '/dashboard/customer',
	},
	{
		id: 'sales',
		title: 'POS Sales',
		total: 1842,
		icon: Store,
		change: '+8.6%',
		trend: 'up',
		href: '/dashboard/pos-sales/create',
	},
	{
		id: 'orders',
		title: 'POS Orders',
		total: 1567,
		icon: ShoppingCart,
		change: '+15.2%',
		trend: 'up',
		href: '/dashboard/pos-sales/orders',
	},
	{
		id: 'payments',
		title: 'POS Payment History',
		total: 1420,
		icon: CreditCard,
		change: '+6.1%',
		trend: 'up',
		href: '/dashboard/pos-sales/payment-history',
	},
	{
		id: 'returns',
		title: 'POS Sales Return',
		total: 86,
		icon: RotateCcw,
		change: '-2.4%',
		trend: 'down',
		href: '/dashboard/pos-sales/return',
	},
];

export const posQuickMetrics = [
	{ label: 'Today Sales', value: '42' },
	{ label: 'Today Revenue', value: '৳ 84,560' },
	{ label: 'Avg. Order Value', value: '৳ 2,012' },
	{ label: 'Return Rate', value: '5.5%' },
];

export const posPaymentStatuses: StatusCount[] = [
	{ label: 'Paid', count: 1124, color: 'bg-emerald-500' },
	{ label: 'Due', count: 318, color: 'bg-amber-500' },
	{ label: 'Partial', count: 125, color: 'bg-blue-500' },
];

export const posOrderStatuses: StatusCount[] = [
	{ label: 'Completed', count: 1284, color: 'bg-emerald-500' },
	{ label: 'Processing', count: 162, color: 'bg-blue-500' },
	{ label: 'Returned', count: 86, color: 'bg-red-500' },
	{ label: 'Cancelled', count: 35, color: 'bg-neutral-400' },
];

export const posCustomerStatuses: StatusCount[] = [
	{ label: 'Active', count: 214, color: 'bg-emerald-500' },
	{ label: 'Inactive', count: 34, color: 'bg-neutral-400' },
];

export const posReturnStatuses: StatusCount[] = [
	{ label: 'Approved', count: 52, color: 'bg-emerald-500' },
	{ label: 'Pending', count: 24, color: 'bg-amber-500' },
	{ label: 'Rejected', count: 10, color: 'bg-red-500' },
];

export const posSalesTrend: ModuleTrendPoint[] = [
	{ month: 'Jan', value: 980 },
	{ month: 'Feb', value: 1120 },
	{ month: 'Mar', value: 1045 },
	{ month: 'Apr', value: 1280 },
	{ month: 'May', value: 1365 },
	{ month: 'Jun', value: 1510 },
];

export const posRevenueTrend: ModuleTrendPoint[] = [
	{ month: 'Jan', value: 1840000 },
	{ month: 'Feb', value: 2105000 },
	{ month: 'Mar', value: 1984000 },
	{ month: 'Apr', value: 2456000 },
	{ month: 'May', value: 2621000 },
	{ month: 'Jun', value: 2898000 },
];

export const recentPosOrders: ModuleTableRow[] = [
	{
		id: 'POS-10482',
		name: 'Rahim Uddin',
		status: 'paid',
		amount: '৳ 4,250',
		date: '2026-06-13',
	},
	{
		id: 'POS-10481',
		name: 'Walk-in Customer',
		status: 'due',
		amount: '৳ 1,890',
		date: '2026-06-13',
	},
	{
		id: 'POS-10480',
		name: 'Sadia Akter',
		status: 'partial',
		amount: '৳ 6,120',
		date: '2026-06-12',
	},
	{
		id: 'POS-10479',
		name: 'Karim Enterprise',
		status: 'paid',
		amount: '৳ 12,450',
		date: '2026-06-12',
	},
];

export const recentPosPayments: ModuleTableRow[] = [
	{
		id: 'PAY-9081',
		name: 'Cash',
		status: 'completed',
		amount: '৳ 2,500',
		date: '2026-06-13',
	},
	{
		id: 'PAY-9080',
		name: 'bKash',
		status: 'completed',
		amount: '৳ 4,250',
		date: '2026-06-13',
	},
	{
		id: 'PAY-9079',
		name: 'Bank Transfer',
		status: 'completed',
		amount: '৳ 12,450',
		date: '2026-06-12',
	},
	{
		id: 'PAY-9078',
		name: 'Cash',
		status: 'completed',
		amount: '৳ 890',
		date: '2026-06-12',
	},
];

export const recentPosReturns: ModuleTableRow[] = [
	{
		id: 'RET-301',
		name: 'POS-10462',
		status: 'approved',
		amount: '৳ 650',
		date: '2026-06-12',
	},
	{
		id: 'RET-300',
		name: 'POS-10458',
		status: 'pending',
		amount: '৳ 1,120',
		date: '2026-06-11',
	},
	{
		id: 'RET-299',
		name: 'POS-10451',
		status: 'rejected',
		amount: '৳ 420',
		date: '2026-06-10',
	},
];

export function sumStatusCounts(statuses: StatusCount[]) {
	return statuses.reduce((sum, item) => sum + item.count, 0);
}
