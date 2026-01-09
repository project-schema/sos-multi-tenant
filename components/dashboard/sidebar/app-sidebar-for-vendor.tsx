'use client';

import { Earth, Tent } from 'lucide-react';
import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import AppRoot from './app-root';
import { NavMain } from './nav-main';
import { SearchForm } from './search-form';
import { filterItems } from './sidebar-actions';
import { vendorSidebarData } from './vendor-sidebar-data';

export function AppSidebarForVendor({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const [searchQuery, setSearchQuery] = React.useState('');
	const { state } = useSidebar();

	const filteredProducts = filterItems(vendorSidebarData.products, searchQuery);
	const filteredPos = filterItems(vendorSidebarData.pos, searchQuery);
	const filteredSettings = filterItems(vendorSidebarData.settings, searchQuery);
	const filteredReports = filterItems(vendorSidebarData.reports, searchQuery);
	const filteredServices = filterItems(
		vendorSidebarData.servicesAndAdvertise,
		searchQuery
	);
	const filteredSupport = filterItems(vendorSidebarData.support, searchQuery);
	const filteredCms = filterItems(vendorSidebarData.cms, searchQuery);
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="mb-4 relative">
				<Link href="/dashboard" className="flex items-center gap-2">
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
				{state === 'expanded' && (
					<Link
						href="/"
						target="_blank"
						className="flex items-center gap-2 absolute right-2 top-5"
					>
						<Earth className="size-6" />
					</Link>
				)}
			</SidebarHeader>

			{/*   Search Input */}
			<SearchForm value={searchQuery} onChange={setSearchQuery as any} />

			{/*   Filtered Navigation */}
			<SidebarContent className="gap-0 pb-8">
				<AppRoot />
				<NavMain items={filteredProducts} groupLabel="Products" />
				<NavMain items={filteredPos} groupLabel="POS & Purchase" />
				<NavMain items={filteredServices} groupLabel="Services & Advertise" />
				<NavMain items={filteredSupport} groupLabel="Support" />
				<NavMain items={filteredReports} groupLabel="Reports" />
				<NavMain items={filteredCms} groupLabel="CMS" />
				<NavMain items={filteredSettings} groupLabel="Settings" />
			</SidebarContent>
		</Sidebar>
	);
}
