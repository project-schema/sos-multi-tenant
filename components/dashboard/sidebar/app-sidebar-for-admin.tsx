'use client';

import { Headset, Megaphone, Tent, UserCog, Wallet } from 'lucide-react';
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
import { sidebarItem } from './sidebar.type';

const usersr: sidebarItem[] = [
	{
		title: 'Manage Users',
		icon: Wallet,
		isActive: false,
		items: [
			{
				title: '',
				url: '/admin/',
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
const users: sidebarItem[] = [
	{
		title: 'Manage Users',
		url: '/admin/users',
		icon: UserCog,
		isActive: false,
	},
];
const userDbAdvertise: sidebarItem[] = [
	{
		title: 'Manage Advertise',
		url: '/user/advertise',
		icon: Megaphone,
		isActive: false,
	},
];
const userSupport: sidebarItem[] = [
	{
		title: 'Manage Support',
		url: '/user/support',
		icon: Headset,
		isActive: false,
	},
];
export function AppSidebarForAdmin({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const [searchQuery, setSearchQuery] = React.useState('');

	const filterItems = (items: sidebarItem[]) => {
		return items
			.map((item) => {
				const subItems = item.items?.filter((sub) =>
					sub.title.toLowerCase().includes(searchQuery.toLowerCase())
				);

				const isMatch =
					item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					(subItems && subItems.length > 0);

				if (isMatch) {
					return {
						...item,
						items: subItems,
					};
				}
				return null;
			})
			.filter(Boolean) as sidebarItem[];
	};

	const filteredAdvertise = filterItems(userDbAdvertise);
	const filterUser = filterItems(users);
	const filteredSupport = filterItems(userSupport);

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
				<NavMain items={filterUser} groupLabel="Users" />
				{/* 
				<NavMain items={filteredAdvertise} groupLabel="Advertise" />
				<NavMain items={filteredWallet} groupLabel="Wallet" />
				<NavMain items={filteredSupport} groupLabel="Support" /> */}
			</SidebarContent>
		</Sidebar>
	);
}
