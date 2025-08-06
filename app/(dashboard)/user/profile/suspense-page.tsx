'use client';

import { DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, Lock, Settings } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';

type LayoutProps = {
	children: React.ReactNode;
};

export default function SuspensePage({ children }: LayoutProps) {
	const searchParams = useSearchParams();
	const activeTab = searchParams.get('tab') || 'profile';

	// Tab config
	const items = useMemo(
		() => [
			{ title: 'Profile', url: '/user/profile?tab=profile', icon: Home },
			{ title: 'Password', url: '/user/profile?tab=password', icon: Lock },
			{ title: 'Settings', url: '/user/profile?tab=settings', icon: Settings },
		],
		[]
	);

	// Find current tab item
	const currentItem =
		items.find((item) => item.url.includes(`tab=${activeTab}`)) || items[0];

	// Dynamic breadcrumb
	const breadcrumbItems = [
		{ name: 'Dashboard', path: '/user' },
		{ name: 'User', path: '/user/profile' },
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
			<div className="mx-6 mt-4 h-full mb-4">
				<Card className="h-full">
					<CardHeader>
						<CardTitle>{currentItem.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex gap-4">
							<SidebarMenu className="max-w-3xs">
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
					</CardContent>
				</Card>
			</div>
		</>
	);
}
