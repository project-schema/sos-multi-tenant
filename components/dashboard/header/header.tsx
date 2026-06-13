'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { FullscreenButton, MotionView } from '@/lib';
import { Notification } from '@/store/features/vendor/notification';
import { Plus, ShoppingCart, Store } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Crumb, DbBreadcrumb } from '../breadcrumb/Breadcrumb';
import { BalanceToggle } from './_ctx/balance-toggle';
import { TenantDropdown } from './_ctx/tenant-dropdown';
import { UserDropdown } from './_ctx/user-dropdown';
export function DbHeader({ breadcrumb }: { breadcrumb: Crumb[] }) {
	const { data: session } = useSession();
	const router = useRouter();
	return (
		<header className="print:hidden fixed w-full top-0 left-0 md:pl-[var(--sidebar-width)] z-10 bg-white  border-b flex h-16   shrink-0 items-center gap-2 transition-[width,height,padding] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12   group-has-data-[collapsible=icon]/sidebar-wrapper:pl-10">
			<MotionView y={10}>
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
			</MotionView>
			{/* Right side elements */}
			<MotionView y={10} className="ml-auto">
				<div className="flex items-center gap-2  px-4">
					<FullscreenButton />
					{session?.tenant_type === 'merchant' ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										size="icon"
										type="button"
										variant="outline"
										onClick={() => router.push('/dashboard/product/create')}
									>
										<Plus className="size-4" />
										<span className="sr-only">Create Product</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>Create Product</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={() => router.push('/dashboard/pos-sales/create')}
										size="icon"
										type="button"
										variant="outline"
									>
										<Store className="size-4" />
										<span className="sr-only">POS</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>POS</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={() => router.push('/dashboard/purchase/create')}
										size="icon"
										type="button"
										variant="outline"
									>
										<ShoppingCart className="size-4" />
										<span className="sr-only">Purchase</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>Purchase</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : null}

					{/* Balance Toggle */}
					{session?.tenant_type !== 'admin' ? <BalanceToggle /> : null}

					{/* Notifications Dropdown */}
					<Notification />

					{/* User Profile Dropdown */}
					{session?.tenant_type === 'user' ? <UserDropdown /> : null}
					{session?.tenant_type === 'admin' ? <UserDropdown /> : null}
					{session?.tenant_type === 'merchant' ||
					session?.tenant_type === 'dropshipper' ? (
						<TenantDropdown />
					) : null}
				</div>
			</MotionView>
		</header>
	);
}
