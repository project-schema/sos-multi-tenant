'use client';

import { Tent } from 'lucide-react';
import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '@/components/ui/sidebar';
import { MotionView } from '@/lib';
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
		searchQuery,
	);
	const filteredSettings = filterItems(
		affiliateSidebarData.settings,
		searchQuery,
	);

	const filteredServices = filterItems(
		affiliateSidebarData.servicesAndAdvertise,
		searchQuery,
	);
	const filteredSupport = filterItems(
		affiliateSidebarData.support,
		searchQuery,
	);

	const filteredCms = filterItems(affiliateSidebarData.cms, searchQuery);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="mb-4">
				<MotionView y={10}>
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
				</MotionView>
			</SidebarHeader>

			{/*   Search Input */}
			<MotionView y={10}>
				<SearchForm value={searchQuery} onChange={setSearchQuery as any} />
			</MotionView>

			{/*   Filtered Navigation */}
			<SidebarContent className="gap-0 pb-8">
				<MotionView y={10}>
					<AppRoot />
				</MotionView>
				<MotionView y={10}>
					<NavMain items={filteredProducts} groupLabel="Products" />
				</MotionView>
				<MotionView y={10}>
					<NavMain items={filteredServices} groupLabel="Services & Advertise" />
				</MotionView>
				<MotionView y={10}>
					<NavMain items={filteredSupport} groupLabel="Support" />
				</MotionView>
				<MotionView y={10}>
					<NavMain items={filteredCms} groupLabel="CMS" />
				</MotionView>
				<MotionView y={10}>
					<NavMain items={filteredSettings} groupLabel="Settings" />
				</MotionView>
			</SidebarContent>
		</Sidebar>
	);
}
