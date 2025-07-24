import { AdminSidebar } from '@/components/dashboard/sidebar/admin-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <AdminSidebar> {children}</AdminSidebar>;
}
