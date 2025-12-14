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
import { useRouter } from 'next/navigation';

export default function AppRoot() {
	const router = useRouter();
	const { data: session } = useSession();
	const handleRootNavigate = (role: string) => {
		switch (session?.tenant_type) {
			case 'admin':
				router.push('/admin');
				break;

			case 'user':
				router.push('/user');
				break;

			default:
				router.push('/dashboard');
				break;
		}
	};
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Root</SidebarGroupLabel>
			<SidebarMenu>
				<Collapsible asChild defaultOpen={true} className="group/collapsible">
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton
								onClick={() => handleRootNavigate('/user')}
								tooltip={'Dashboard'}
								className="cursor-pointer"
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
