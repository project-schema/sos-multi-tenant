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
import { useRouter } from 'next/navigation';
import { sidebarItem } from './sidebar.type';

export function NavMain({
	items,
	groupLabel = 'Platform',
}: {
	items: sidebarItem[];
	groupLabel?: string;
}) {
	const router = useRouter();
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
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									onClick={() => handleNavigation(item)}
									tooltip={item.title}
									className="cursor-pointer"
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
													<Link href={subItem.url} className="block w-full">
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
