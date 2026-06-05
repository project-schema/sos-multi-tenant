'use client';

import { Tent } from 'lucide-react';
import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { adminSidebarData } from './admin-sidebar-data';
import AppRoot from './app-root';
import { NavMain } from './nav-main';
import { SearchForm } from './search-form';
import { filterItems } from './sidebar-actions';
import { useAdminSidebarPermissions } from './use-admin-sidebar-permissions';

export function AppSidebarForAdmin({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [openItem, setOpenItem] = React.useState<string | null>(null);
	const { filterByPermission } = useAdminSidebarPermissions();

	const filteredProducts = filterItems(
		filterByPermission(adminSidebarData.products),
		searchQuery,
	);
	const filterUser = filterItems(
		filterByPermission(adminSidebarData.users),
		searchQuery,
	);
	const filteredServices = filterItems(
		filterByPermission(adminSidebarData.services),
		searchQuery,
	);
	const filteredCMS = filterItems(
		filterByPermission(adminSidebarData.cms),
		searchQuery,
	);
	const filteredHRM = filterItems(
		filterByPermission(adminSidebarData.hrm),
		searchQuery,
	);
	const filteredSupport = filterItems(
		filterByPermission(adminSidebarData.support),
		searchQuery,
	);
	const filteredAdvertise = filterItems(
		filterByPermission(adminSidebarData.advertise),
		searchQuery,
	);
	const filteredSaas = filterItems(
		filterByPermission(adminSidebarData.sass),
		searchQuery,
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
				<NavMain
					items={filterUser}
					groupLabel="Users"
					openItem={openItem}
					setOpenItem={setOpenItem}
				/>
				<NavMain
					items={filteredProducts}
					groupLabel="Products"
					openItem={openItem}
					setOpenItem={setOpenItem}
				/>
				<NavMain
					items={filteredServices}
					groupLabel="Services"
					openItem={openItem}
					setOpenItem={setOpenItem}
				/>
				<NavMain
					items={filteredAdvertise}
					groupLabel="Advertise"
					openItem={openItem}
					setOpenItem={setOpenItem}
				/>
				<NavMain
					items={filteredSaas}
					groupLabel="Saas"
					openItem={openItem}
					setOpenItem={setOpenItem}
				/>
				<NavMain
					items={filteredSupport}
					groupLabel="Support"
					openItem={openItem}
					setOpenItem={setOpenItem}
				/>
				<NavMain
					items={filteredCMS}
					groupLabel="CMS"
					openItem={openItem}
					setOpenItem={setOpenItem}
				/>
				<NavMain
					items={filteredHRM}
					groupLabel="HRM"
					openItem={openItem}
					setOpenItem={setOpenItem}
				/>
			</SidebarContent>
		</Sidebar>
	);
}
