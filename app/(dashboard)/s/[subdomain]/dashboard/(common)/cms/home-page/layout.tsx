'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, Palette, Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	const searchParams = useSearchParams();
	const activeTab = searchParams.get('tab') || 'home';

	// Tab config
	const items = useMemo(
		() => [
			{
				title: 'Home Banner',
				tab: 'home-banner',
				url: `/dashboard/cms/home-page?tab=home-banner`,
				icon: Home,
			},
			{
				title: 'Home Service',
				tab: 'home-service',
				url: `/dashboard/cms/home-page?tab=home-service`,
				icon: Palette,
			},
			{
				title: 'Home Category',
				tab: 'home-category',
				url: `/dashboard/cms/home-page?tab=home-category`,
				icon: Search,
			},
		],
		[]
	);

	// Find current tab item
	const currentItem = items.find((item) => item.tab === activeTab) || items[0];

	// Dynamic breadcrumb
	const breadcrumbItems = [
		{ name: 'Dashboard', path: '/dashboard' },
		{ name: `CMS ${currentItem.title}` },
	];

	// Update document title dynamically
	useEffect(() => {
		if (typeof window !== 'undefined') {
			document.title = `${currentItem.title} - System | CMS`;
		}
	}, [currentItem]);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isLoading={false}
				isError={false}
				header={<CardTitle>System - {currentItem.title}</CardTitle>}
			>
				<div className="flex gap-4 flex-col lg:flex-row">
					<SidebarMenu className="flex flex-row lg:flex-col w-full lg:max-w-3xs flex-wrap">
						{items.map((item) => {
							const isActive = item.tab === activeTab;
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className={`flex items-center gap-2 ${
												isActive
													? 'text-primary font-semibold'
													: 'text-muted-foreground'
											}`}
										>
											<item.icon size={18} />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>

					<div className="w-full">{children}</div>
				</div>
			</Container1>
		</>
	);
}
