'use client';

import * as React from 'react';
import {
	BookOpen,
	Bot,
	Frame,
	Headset,
	LucideIcon,
	Map,
	Megaphone,
	PackageSearch,
	PieChart,
	Settings2,
	SquareTerminal,
	Tent,
	Wallet,
} from 'lucide-react';

import { NavMain } from './nav-main';
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import AppRoot from './app-root';
import Link from 'next/link';
import { SearchForm } from './search-form';

export type sidebarSubItem = {
	title: string;
	url: string;
};

export type sidebarItem = {
	title: string;
	url?: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: sidebarSubItem[];
};

// This is sample data.
const data = {
	navMain: [
		{
			title: 'Playground',
			url: '#',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'History',
					url: '#',
				},
				{
					title: 'Starred',
					url: '#',
				},
				{
					title: 'Settings',
					url: '#',
				},
			],
		},
		{
			title: 'Models',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'Genesis',
					url: '#',
				},
				{
					title: 'Explorer',
					url: '#',
				},
				{
					title: 'Quantum',
					url: '#',
				},
			],
		},
		{
			title: 'Documentation',
			url: '#',
			icon: BookOpen,
			items: [
				{
					title: 'Introduction',
					url: '#',
				},
				{
					title: 'Get Started',
					url: '#',
				},
				{
					title: 'Tutorials',
					url: '#',
				},
				{
					title: 'Changelog',
					url: '#',
				},
			],
		},
		{
			title: 'Settings',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'General',
					url: '#',
				},
				{
					title: 'Team',
					url: '#',
				},
				{
					title: 'Billing',
					url: '#',
				},
				{
					title: 'Limits',
					url: '#',
				},
			],
		},
	],
	projects: [
		{
			name: 'Design Engineering',
			url: '#',
			icon: Frame,
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: PieChart,
		},
		{
			name: 'Travel',
			url: '#',
			icon: Map,
		},
	],
};

const userDbWallet: sidebarItem[] = [
	{
		title: 'My Wallet',
		icon: Wallet,
		isActive: false,
		items: [
			{
				title: 'Withdraw',
				url: '/user/withdraw',
			},
			{
				title: 'Recharge',
				url: '/user/recharge',
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
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="mb-4">
				<Link href="/" className="flex items-center gap-2">
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg ">
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
			<SearchForm />
			<SidebarContent className="gap-0">
				<AppRoot />
				{/* user sidebar */}
				<NavMain items={userDbOrder} groupLabel="Order" />
				<NavMain items={userDbAdvertise} groupLabel="Advertise" />
				<NavMain items={userDbWallet} groupLabel="Wallet" />
				<NavMain items={userSupport} groupLabel="Support" />
			</SidebarContent>
		</Sidebar>
	);
}
