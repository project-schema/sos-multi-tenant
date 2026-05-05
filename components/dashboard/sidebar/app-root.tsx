'use client';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LayoutDashboard } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
export default function AppRoot() {
	const router = useRouter();
	const pathName = usePathname();
	const { data: session } = useSession();
	const getRootPath = () => {
		switch (session?.tenant_type) {
			case 'admin':
				return '/admin';
			case 'user':
				return '/user';
			default:
				return '/dashboard';
		}
	};
	const handleRootNavigate = () => {
		router.push(getRootPath());
	};

	const isActive = () => {
		const rootPath = getRootPath();
		return pathName === rootPath;
	};
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Root</SidebarGroupLabel>
			<SidebarMenu>
				<Collapsible asChild defaultOpen={true} className="group/collapsible">
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton
								onClick={handleRootNavigate}
								tooltip={'Dashboard'}
								className={`cursor-pointer ${
									isActive() ? 'text-gray-900 font-medium' : 'text-gray-600'
								}`}
							>
								<LayoutDashboard />
								<span>Dashboard</span>
							</SidebarMenuButton>
						</CollapsibleTrigger>
					</SidebarMenuItem>
				</Collapsible>
			</SidebarMenu>
		</SidebarGroup>
	);
}
