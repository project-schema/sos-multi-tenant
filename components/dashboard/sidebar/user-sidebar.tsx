'use client';
import { AppSidebar } from './app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export function UserSidebar({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="sdfsdf">
			<AppSidebar />
			<SidebarInset className="pt-20">{children}</SidebarInset>
		</SidebarProvider>
	);
}
