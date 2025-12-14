'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, ScrollText, Store } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	const params = useParams();
	const searchParams = useSearchParams();
	const activeTab = searchParams.get('tab') || 'profile';

	// Tab config
	const items = useMemo(
		() => [
			{
				title: 'Profile',
				url: `/profile?tab=profile`,
				icon: Home,
			},
			{
				title: 'Note',
				url: `/profile?tab=note`,
				icon: ScrollText,
			},
			{
				title: 'My Shop',
				url: `/profile?tab=my_shop`,
				icon: Store,
			},
		],
		[]
	);

	// Find current tab item
	const currentItem =
		items.find((item) => item.url.includes(`tab=${activeTab}`)) || items[0];

	// Dynamic breadcrumb
	const breadcrumbItems = [
		{ name: 'Dashboard', path: '/dashboard' },
		{ name: currentItem.title },
	];

	// Update document title dynamically
	useEffect(() => {
		if (window) {
			document.title = `${currentItem.title} | SOS`;
		}
	}, [currentItem]);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>{currentItem.title}</CardTitle>}>
				<div className="flex gap-4 flex-col lg:flex-row">
					<SidebarMenu className=" flex flex-row lg:flex-col w-full lg:max-w-3xs flex-wrap">
						{items.map((item) => {
							const isActive = item.url.includes(`tab=${activeTab}`);
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
					<Card className="w-full">
						<CardContent>
							<div>{children}</div>
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
