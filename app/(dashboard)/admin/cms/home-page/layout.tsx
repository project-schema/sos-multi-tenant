'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSystemQuery } from '@/store/features/vendor/cms/system/api-slice';
import { Image, Palette } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	const searchParams = useSearchParams();
	const activeTab = searchParams.get('tab') || 'banner';
	const { data, isLoading: loading, isError, refetch } = useSystemQuery();

	// Tab config
	const items = useMemo(
		() => [
			{
				title: 'Banner',
				tab: 'banner',
				url: `/admin/cms/home-page?tab=banner`,
				icon: Image,
			},
			{
				title: 'Home Feature 1',
				tab: 'feature1',
				url: `/admin/cms/home-page?tab=feature1`,
				icon: Palette,
			},
			{
				title: 'Home Feature 2',
				tab: 'feature2',
				url: `/admin/cms/home-page?tab=feature2`,
				icon: Palette,
			},
			{
				title: 'Home Feature 3',
				tab: 'feature3',
				url: `/admin/cms/home-page?tab=feature3`,
				icon: Palette,
			},
			{
				title: 'Home Feature 4',
				tab: 'feature4',
				url: `/admin/cms/home-page?tab=feature4`,
				icon: Palette,
			},
			{
				title: 'Home Feature 5',
				tab: 'feature5',
				url: `/admin/cms/home-page?tab=feature5`,
				icon: Palette,
			},
			{
				title: 'Home Feature 6',
				tab: 'feature6',
				url: `/admin/cms/home-page?tab=feature6`,
				icon: Palette,
			},
			{
				title: 'Home Feature 7',
				tab: 'feature7',
				url: `/admin/cms/home-page?tab=feature7`,
				icon: Palette,
			},
			{
				title: 'Home Feature 8',
				tab: 'feature8',
				url: `/admin/cms/home-page?tab=feature8`,
				icon: Palette,
			},
			{
				title: 'Home Feature 9',
				tab: 'feature9',
				url: `/admin/cms/home-page?tab=feature9`,
				icon: Palette,
			},
			{
				title: 'Home Feature 10',
				tab: 'feature10',
				url: `/admin/cms/home-page?tab=feature10`,
				icon: Palette,
			},
		],
		[],
	);

	// Find current tab item
	const currentItem = items.find((item) => item.tab === activeTab) || items[0];

	// Dynamic breadcrumb
	const breadcrumbItems = [
		{ name: 'admin', path: '/admin' },
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
				header={<CardTitle>Home - {currentItem.title}</CardTitle>}
			>
				<div className="flex gap-4 flex-col lg:flex-row">
					<SidebarMenu className="flex flex-row lg:flex-col w-full lg:max-w-3xs flex-wrap">
						{items.map((item) => {
							const isActive = item.tab === activeTab;
							// need hide home slider if theme is two
							if (data?.data?.theme === 'two' && item.tab === 'home-slider') {
								return null;
							}

							if (
								data?.data?.theme !== 'one' &&
								(item.tab === 'section-4' ||
									item.tab === 'section-5' ||
									item.tab === 'section-6')
							) {
								return null;
							}

							// need hide recommended category if theme is one
							if (
								data?.data?.theme === 'one' &&
								(item.tab === 'recommended-category' ||
									item.tab === 'home-banner-image')
							) {
								return null;
							}

							// need hide home banner image if theme is three and one
							// if (
							// 	data?.data.theme === 'two' &&
							// 	item.tab === 'home-banner-image'
							// ) {
							// 	return null;
							// }

							if (
								data?.data?.theme === 'three' &&
								(item.tab === 'home-banner-image' ||
									item.tab === 'advertise-banner' ||
									item.tab === 'home-slider' ||
									item.tab === 'home-offer')
							) {
								return null;
							}

							if (
								data?.data?.theme !== 'three' &&
								(item.tab === 'home-banner-1-image' ||
									item.tab === 'advertise-banner-1-4')
							) {
								return null;
							}

							if (
								data?.data?.theme === 'four' &&
								(item.tab === 'home-banner-image' ||
									item.tab === 'best-selling-product')
							) {
								return null;
							}

							return (
								<SidebarMenuItem key={item.tab}>
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
