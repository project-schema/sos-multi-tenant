'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SessionProvider } from '@/provider';
import { Code, Home, Palette, Search, Text } from 'lucide-react';
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
				title: 'Basic Info',
				tab: 'basic-info',
				url: `/dashboard/cms/system?tab=basic-info`,
				icon: Home,
			},
			{
				title: 'Theme',
				tab: 'theme',
				url: `/dashboard/cms/system?tab=theme`,
				icon: Palette,
			},
			{
				title: 'SEO',
				tab: 'seo',
				url: `/dashboard/cms/system?tab=seo`,
				icon: Search,
			},
			{
				title: 'Scripts',
				tab: 'scripts',
				url: `/dashboard/cms/system?tab=scripts`,
				icon: Code,
			},
			{
				title: 'Footer',
				tab: 'footer',
				url: `/dashboard/cms/system?tab=footer`,
				icon: Text,
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
		<SessionProvider>
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
		</SessionProvider>
	);
}
