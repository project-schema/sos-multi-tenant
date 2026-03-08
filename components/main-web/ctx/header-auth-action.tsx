'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib';
import { dashboardLink, profileLink } from '@/lib/links';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const HeaderAuthAction = () => {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return (
			<div className="hidden lg:flex items-center gap-2.5">
				<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
				<div className="flex flex-col gap-1">
					<div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
					<div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
				</div>
			</div>
		);
	}

	if (status === 'authenticated') {
		return (
			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className="avatar online placeholder focus:outline-none"
						>
							<div className="bg-[#004da3] text-white rounded-full w-16 h-16 flex items-center justify-center">
								<span className="text-xl capitalize">
									{session?.user?.name?.slice(0, 2) || '--'}
								</span>
							</div>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-52">
						<DropdownMenuLabel className="capitalize">
							{session?.user?.name}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="capitalize mb-1"
							onClick={() => {
								profileLink(session?.tenant_type);
							}}
							asChild
						>
							<Link href={profileLink(session?.tenant_type)}>Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="capitalize mb-1"
							asChild
							onClick={() => {
								dashboardLink(session?.tenant_type);
							}}
						>
							<Link href={dashboardLink(session?.tenant_type)}>Dashboard</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className={` !py-1 !w-full`}
							onClick={() => logout()}
						>
							<span className="">Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	return (
		<div className="hidden lg:flex  items-start">
			<Link
				href="/auth?tab=login"
				className="ease-ease px-[32px] py-[12px]  text-[18px] font-medium"
			>
				Login
			</Link>

			<Link
				href="/auth?tab=register"
				className="ease-ease px-[32px] py-[12px] text-white btn--gradient rounded-[90px] text-[18px] font-medium"
			>
				Register
			</Link>
		</div>
	);
};
