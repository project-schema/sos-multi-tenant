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
import type {
	ModuleOverview,
	StatusCount,
	UserTypeGroup,
} from './admin-dashboard-data';
import type {
	AdminModuleOverviewItem,
	AdminStatusCount,
	AdminUserTypeGroup,
} from './type';

const STATUS_COLOR_MAP: Record<string, string> = {
	Active: 'bg-emerald-500',
	Running: 'bg-emerald-500',
	Approved: 'bg-emerald-500',
	Completed: 'bg-emerald-500',
	Closed: 'bg-emerald-500',
	Delivered: 'bg-emerald-500',
	Pending: 'bg-amber-500',
	Request: 'bg-amber-500',
	Hold: 'bg-orange-500',
	Received: 'bg-blue-500',
	Processing: 'bg-indigo-500',
	Progress: 'bg-blue-500',
	Edit: 'bg-blue-500',
	Paused: 'bg-blue-500',
	Answered: 'bg-blue-500',
	Trial: 'bg-blue-500',
	Return: 'bg-purple-500',
	Rejected: 'bg-red-500',
	Cancelled: 'bg-red-500',
	Blocked: 'bg-red-500',
	Expired: 'bg-neutral-400',
	Deactivate: 'bg-neutral-400',
};

const FALLBACK_COLORS = [
	'bg-emerald-500',
	'bg-amber-500',
	'bg-blue-500',
	'bg-red-500',
	'bg-neutral-400',
	'bg-orange-500',
	'bg-indigo-500',
	'bg-purple-500',
];

export const MODULE_ICON_MAP: Record<string, LucideIcon> = {
	users: Users,
	products: Package,
	requests: PackageOpen,
	orders: ShoppingBag,
	services: Wrench,
	advertise: Megaphone,
	coupons: Percent,
	membership: Crown,
	subscription: Sparkles,
	support: Headset,
	withdraw: BanknoteArrowDown,
};

export function toStatusCounts(statuses?: AdminStatusCount[]): StatusCount[] {
	return (
		statuses?.map((status, index) => ({
			label: status.label,
			count: status.count,
			color:
				status.color ||
				STATUS_COLOR_MAP[status.label] ||
				FALLBACK_COLORS[index % FALLBACK_COLORS.length],
		})) ?? []
	);
}

export function sumStatusCounts(statuses?: AdminStatusCount[]): number {
	return statuses?.reduce((sum, item) => sum + item.count, 0) ?? 0;
}

export function mapUserTypeGroups(
	groups?: AdminUserTypeGroup[],
): UserTypeGroup[] {
	return (
		groups?.map((group) => ({
			type: group.type,
			total: group.total,
			statuses: toStatusCounts(group.statuses),
		})) ?? []
	);
}

export function mapModuleOverview(
	items?: AdminModuleOverviewItem[],
): ModuleOverview[] {
	return (
		items?.map((item) => ({
			...item,
			icon: MODULE_ICON_MAP[item.id] ?? Users,
			trend: item.trend === 'down' ? 'down' : 'up',
		})) ?? []
	);
}

export function getModuleIcon(id: string): LucideIcon {
	return MODULE_ICON_MAP[id] ?? Users;
}
