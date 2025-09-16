'use client';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib';
import { AppSidebarForAffiliate } from './app-sidebar-for-affiliate';

export function AffiliateSidebar({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebarForAffiliate />
			<SidebarInset
				className={cn(
					'overflow-x-hidden pt-[calc(var(--spacing)*20)] xl:pt-20 group-has-data-[collapsible=icon]/sidebar-wrapper:pt-14 xl:group-has-data-[collapsible=icon]/sidebar-wrapper:pt-16 transition-all'
				)}
			>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
