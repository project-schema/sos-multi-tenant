import { AdminSidebar } from '@/components/dashboard/sidebar/admin-sidebar';
import AdminLayoutClient from './layout-client';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<AdminLayoutClient>
			<AdminSidebar>{children}</AdminSidebar>
		</AdminLayoutClient>
	);
}
