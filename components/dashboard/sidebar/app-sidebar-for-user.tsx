'use client';

import { Headset, Megaphone, PackageSearch, Tent, Wallet } from 'lucide-react';
import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import AppRoot from './app-root';
import { NavMain } from './nav-main';
import { SearchForm } from './search-form';
import { filterItems } from './sidebar-actions';
import { sidebarItem } from './sidebar.type';

const userDbWallet: sidebarItem[] = [
	{
		title: 'My Wallet',
		icon: Wallet,
		isActive: false,
		items: [
			{
				title: 'Recharge',
				url: '/user/recharge',
			},
			{
				title: 'Withdraw',
				url: '/user/withdraw',
			},
			{
				title: 'History',
				url: '/user/history',
			},
		],
	},
];
const userDbOrder: sidebarItem[] = [
	{
		title: 'Manage Order',
		url: '/user/order',
		icon: PackageSearch,
		isActive: false,
	},
];
const userDbAdvertise: sidebarItem[] = [
	{
		title: 'Manage Advertise',
		icon: Megaphone,
		isActive: false,
		items: [
			{
				title: 'Create Advertise',
				url: '/user/advertise/create',
			},
			{
				title: 'All Advertise',
				url: '/user/advertise',
			},
		],
	},
];
const userSupport: sidebarItem[] = [
	{
		title: 'Manage Support',
		icon: Headset,
		isActive: false,
		items: [
			{
				title: 'Create Support',
				url: '/user/support/create',
			},
			{
				title: 'All Support',
				url: '/user/support',
			},
		],
	},
];
export function AppSidebarForUser({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const [searchQuery, setSearchQuery] = React.useState('');

	const filteredOrder = filterItems(userDbOrder, searchQuery);
	const filteredAdvertise = filterItems(userDbAdvertise, searchQuery);
	const filteredWallet = filterItems(userDbWallet, searchQuery);
	const filteredSupport = filterItems(userSupport, searchQuery);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="mb-4">
				<Link href="/" className="flex items-center gap-2">
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<Tent className="size-4" />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium text-lg">
							Start Own Startup
						</span>
						<span className="truncate text-xs">This is your Business</span>
					</div>
				</Link>
			</SidebarHeader>

			{/* 🔍 Search Input */}
			<SearchForm value={searchQuery} onChange={setSearchQuery as any} />

			{/* 📚 Filtered Navigation */}
			<SidebarContent className="gap-0">
				<AppRoot />
				<NavMain items={filteredOrder} groupLabel="Order" />
				<NavMain items={filteredAdvertise} groupLabel="Advertise" />
				<NavMain items={filteredWallet} groupLabel="Wallet" />
				<NavMain items={filteredSupport} groupLabel="Support" />
			</SidebarContent>
		</Sidebar>
	);
}
