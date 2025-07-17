import { UserSidebar } from '@/components/dashboard/sidebar/user-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <UserSidebar> {children}</UserSidebar>;
}
