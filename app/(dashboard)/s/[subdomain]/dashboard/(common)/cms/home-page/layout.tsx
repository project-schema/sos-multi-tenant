'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SessionProvider } from '@/provider';
import {
	Home,
	Image,
	Megaphone,
	Package,
	Palette,
	Search,
	ShoppingCart,
} from 'lucide-react';
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
				title: 'Home Slider',
				tab: 'home-slider',
				url: `/dashboard/cms/home-page?tab=home-slider`,
				icon: Home,
			},
			{
				title: 'Home Banner Image',
				tab: 'home-banner-image',
				url: `/dashboard/cms/home-page?tab=home-banner-image`,
				icon: Image,
			},
			{
				title: 'Home Service',
				tab: 'home-service',
				url: `/dashboard/cms/home-page?tab=home-service`,
				icon: Palette,
			},
			{
				title: 'Popular Category',
				tab: 'popular-category',
				url: `/dashboard/cms/home-page?tab=popular-category`,
				icon: Search,
			},
			{
				title: 'Best Selling Product',
				tab: 'best-selling-product',
				url: `/dashboard/cms/home-page?tab=best-selling-product`,
				icon: ShoppingCart,
			},
			{
				title: 'Best Selling Category',
				tab: 'best-selling-category',
				url: `/dashboard/cms/home-page?tab=best-selling-category`,
				icon: Package,
			},
			{
				title: 'Recommended Category',
				tab: 'recommended-category',
				url: `/dashboard/cms/home-page?tab=recommended-category`,
				icon: Package,
			},
			{
				title: 'Home Offer',
				tab: 'home-offer',
				url: `/dashboard/cms/home-page?tab=home-offer`,
				icon: ShoppingCart,
			},
			{
				title: 'Advertise Banner',
				tab: 'advertise-banner',
				url: `/dashboard/cms/home-page?tab=advertise-banner`,
				icon: Megaphone,
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
				header={<CardTitle>Home - {currentItem.title}</CardTitle>}
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
