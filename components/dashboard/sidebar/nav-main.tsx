'use client';

import { ChevronRight } from 'lucide-react';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { MotionItem } from '@/lib';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { sidebarItem } from './sidebar.type';

function NavMainInner({
	items,
	groupLabel = 'Platform',
	openItem,
	setOpenItem,
}: {
	items: sidebarItem[];
	groupLabel?: string;
	openItem: string | null;
	setOpenItem: (value: string | null) => void;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const type = searchParams.get('type');

	useEffect(() => {
		const activeItem = items.find((item) => isParentActive(item));
		if (activeItem) {
			setOpenItem(activeItem.title);
		}
	}, [pathname]);

	const isActive = (url?: string) => {
		if (!url || url === '#') return false;

		const [basePath, queryString] = url.split('?');

		// check pathname first
		if (pathname !== basePath) return false;

		// if no query → match only path
		if (!queryString) return true;

		const params = new URLSearchParams(queryString);
		const urlType = params.get('type');

		return urlType === type;
	};

	const isParentActive = (item: sidebarItem) => {
		if (isActive(item.url)) return true;
		return item.items?.some((sub) => isActive(sub.url));
	};

	const handleNavigation = (item: sidebarItem) => {
		if (item.url && item.url !== '#' && item.url !== '') {
			router.push(item.url);
		}
	};

	if (!items || items.length === 0) {
		return null;
	}
	return (
		<SidebarGroup>
			<SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={isParentActive(item)}
						open={openItem === item.title}
						onOpenChange={(isOpen) => setOpenItem(isOpen ? item.title : null)}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									onClick={() => handleNavigation(item)}
									tooltip={item.title}
									className={`cursor-pointer ${
										isActive(item.url) || isParentActive(item)
											? 'bg-muted text-gray-900 font-medium'
											: 'text-gray-700'
									}`}
								>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									{item?.items && item?.items?.length > 0 && (
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									)}
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem, i) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<MotionItem i={i * 0.03} y={2}>
													<Link
														href={subItem.url}
														className={`block w-full ${
															isActive(subItem.url)
																? 'text-gray-900 font-medium'
																: 'text-gray-600'
														}`}
													>
														<span className="text-xs">{subItem.title} </span>
													</Link>
												</MotionItem>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
export function NavMain({
	items,
	groupLabel = 'Platform',
	openItem,
	setOpenItem,
}: {
	items: sidebarItem[];
	groupLabel?: string;
	openItem: string | null;
	setOpenItem: (value: string | null) => void;
}) {
	return (
		<Suspense fallback={null}>
			<NavMainInner
				items={items}
				groupLabel={groupLabel}
				openItem={openItem}
				setOpenItem={setOpenItem}
			/>
		</Suspense>
	);
}
