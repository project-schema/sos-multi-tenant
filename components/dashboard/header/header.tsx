'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Notification } from '@/store/features/vendor/notification';
import { useSession } from 'next-auth/react';
import { Crumb, DbBreadcrumb } from '../breadcrumb/Breadcrumb';
import { BalanceToggle } from './_ctx/balance-toggle';
import { TenantDropdown } from './_ctx/tenant-dropdown';
import { UserDropdown } from './_ctx/user-dropdown';
export function DbHeader({ breadcrumb }: { breadcrumb: Crumb[] }) {
	const { data: session } = useSession();

	return (
		<header className="fixed w-full top-0 left-0 md:pl-[var(--sidebar-width)] z-10 bg-white  border-b flex h-16   shrink-0 items-center gap-2 transition-[width,height,padding] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12   group-has-data-[collapsible=icon]/sidebar-wrapper:pl-10">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<DbBreadcrumb items={breadcrumb} />
				{/* <Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href="/user">{page}</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>{subPage}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb> */}
			</div>

			{/* Right side elements */}
			<div className="flex items-center gap-2 ml-auto px-4">
				{/* Balance Toggle */}
				{session?.user?.tenant_type !== 'admin' ? <BalanceToggle /> : null}

				{/* Notifications Dropdown */}
				<Notification />

				{/* User Profile Dropdown */}
				{session?.user?.tenant_type === 'user' ? <UserDropdown /> : null}
				{session?.user?.tenant_type === 'merchant' ||
				session?.user?.tenant_type === 'dropshipper' ? (
					<TenantDropdown />
				) : null}
			</div>
		</header>
	);
}
