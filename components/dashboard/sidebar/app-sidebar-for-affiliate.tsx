'use client';

import { Tent } from 'lucide-react';
import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { affiliateSidebarData } from './affiliate-sidebar-data';
import AppRoot from './app-root';
import { NavMain } from './nav-main';
import { SearchForm } from './search-form';
import { filterItems } from './sidebar-actions';

export function AppSidebarForAffiliate({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const [searchQuery, setSearchQuery] = React.useState('');

	const filteredProducts = filterItems(
		affiliateSidebarData.products,
		searchQuery
	);
	const filteredSettings = filterItems(
		affiliateSidebarData.settings,
		searchQuery
	);

	const filteredServices = filterItems(
		affiliateSidebarData.servicesAndAdvertise,
		searchQuery
	);
	const filteredSupport = filterItems(
		affiliateSidebarData.support,
		searchQuery
	);

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

			{/*   Search Input */}
			<SearchForm value={searchQuery} onChange={setSearchQuery as any} />

			{/*   Filtered Navigation */}
			<SidebarContent className="gap-0 pb-8">
				<AppRoot />
				<NavMain items={filteredProducts} groupLabel="Products" />
				<NavMain items={filteredServices} groupLabel="Services & Advertise" />
				<NavMain items={filteredSupport} groupLabel="Support" />
				<NavMain items={filteredSettings} groupLabel="Settings" />
			</SidebarContent>
		</Sidebar>
	);
}
