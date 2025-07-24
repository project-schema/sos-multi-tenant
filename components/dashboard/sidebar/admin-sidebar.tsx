'use client';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebarForAdmin } from './app-sidebar-for-admin';

export function AdminSidebar({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebarForAdmin />
			<SidebarInset className="pt-20 overflow-x-hidden">
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
