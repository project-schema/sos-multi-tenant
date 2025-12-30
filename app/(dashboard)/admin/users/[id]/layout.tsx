'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
	Award,
	CreditCard,
	DollarSign,
	FileBadge2,
	Home,
	ScrollText,
} from 'lucide-react';
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
	const isTenant = searchParams.get('type');

	// Tab config
	const items = useMemo(
		() => [
			{
				title: 'Profile',
				url: `/admin/users/${params.id}?tab=profile&type=${isTenant}`,
				icon: Home,
			},
			{
				title: 'Note',
				url: `/admin/users/${params.id}?tab=note&type=${isTenant}`,
				icon: ScrollText,
			},
			{
				title: 'Payments',
				url: `/admin/users/${params.id}?tab=payments&type=${isTenant}`,
				icon: DollarSign,
			},
			{
				title: 'Subscriptions',
				url: `/admin/users/${params.id}?tab=subscriptions&type=${isTenant}`,
				icon: CreditCard,
			},
			{
				title: 'Service',
				url: `/admin/users/${params.id}?tab=service&type=${isTenant}`,
				icon: FileBadge2,
			},
			{
				title: 'Advertisement',
				url: `/admin/users/${params.id}?tab=advertisement`,
				icon: Award,
			},
		],
		[]
	);

	// Find current tab item
	const currentItem =
		items.find((item) => item.url.includes(`tab=${activeTab}`)) || items[0];

	// Dynamic breadcrumb
	const breadcrumbItems = [
		{ name: 'Dashboard', path: '/admin' },
		{ name: 'User', path: `/admin/users/${params.id}` },
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
