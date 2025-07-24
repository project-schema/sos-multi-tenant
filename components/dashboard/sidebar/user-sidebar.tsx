'use client';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebarForUser } from './app-sidebar-for-user';

export function UserSidebar({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebarForUser />
			<SidebarInset className="pt-20 overflow-x-hidden">
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
