'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib';
import { accountLink } from '@/lib/links/account';
import {
	LayoutDashboard,
	LogOut,
	Settings,
	ShoppingBag,
	User,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export function UserAccount1() {
	const { data: session, status } = useSession();

	const isLoading = status === 'loading';
	const isAuthenticated = status === 'authenticated' && session?.user;

	// Show skeleton while loading
	if (isLoading) {
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

	// Logged in state
	if (isAuthenticated) {
		return (
			<div className="hidden lg:flex items-center gap-2.5">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="flex items-center gap-2.5 outline-none">
							<div className="w-10 h-10 bg-black border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
								<User className="w-5 h-5 text-black" />
							</div>
							<div className="flex flex-col gap-0.5 text-left">
								<span className="text-xs text-black leading-tight">
									Welcome back
								</span>
								<span className="text-sm font-bold text-black/70 leading-tight truncate max-w-[120px]">
									{session.user.name || 'User'}
								</span>
							</div>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuItem asChild>
							<Link href={accountLink(session)} className="cursor-pointer">
								<LayoutDashboard className="mr-2 h-4 w-4" />
								Dashboard
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link
								href={
									session.user.role_type === 'admin'
										? '/dashboard/product-order'
										: '/account?view=orders'
								}
								className="cursor-pointer"
							>
								<ShoppingBag className="mr-2 h-4 w-4" />
								My Orders
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link
								href={
									session.user.role_type === 'admin'
										? '/dashboard/profile'
										: '/account?view=profile'
								}
								className="cursor-pointer"
							>
								<Settings className="mr-2 h-4 w-4" />
								Profile Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => logout()}
							className="cursor-pointer text-red-600 focus:text-red-600"
						>
							<LogOut className="mr-2 h-4 w-4" />
							Log Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	}

	// Not logged in state
	return (
		<div className="hidden lg:flex items-center gap-2.5">
			<div className="w-10 h-10 bg-white border border-[#DBDFE9] rounded-full flex items-center justify-center flex-shrink-0">
				<User className="w-5 h-5 text-black" />
			</div>
			<div className="flex flex-col gap-0.5">
				<span className="text-xs text-black leading-tight">Welcome</span>
				<div className="flex items-center gap-1">
					<Link
						href="/auth?tab=login"
						className="text-sm font-bold text-black/70 hover:text-black transition-colors leading-tight"
					>
						Log In
					</Link>
					<span className="text-sm text-black/70">/</span>
					<Link
						href="/auth?tab=register"
						className="text-sm font-bold text-black/70 hover:text-black transition-colors leading-tight"
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}
