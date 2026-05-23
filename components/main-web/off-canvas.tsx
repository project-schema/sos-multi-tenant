'use client';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { cn, logout } from '@/lib';
import { menuData } from '@/lib/data/NavMenu';
import { dashboardLink, profileLink } from '@/lib/links';
import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

function MobileNavLink({
	href,
	children,
	className,
}: {
	href: string;
	children: ReactNode;
	className?: string;
}) {
	const pathname = usePathname();
	const isActive =
		pathname === href ||
		(href !== '/' && pathname.startsWith(href) && href.length > 1);

	return (
		<DrawerClose asChild>
			<Link
				href={href}
				className={cn(
					'hover:text-primary text-[26px] text-white leading-[36px] transition-colors',
					isActive && 'text-primary',
					className
				)}
			>
				{children}
			</Link>
		</DrawerClose>
	);
}

export const MainWebOffCanvas = () => {
	const { data: session, status } = useSession();

	return (
		<Drawer direction="left">
			<DrawerTrigger
				className="lg:hidden flex items-center justify-center p-1"
				aria-label="Open menu"
			>
				<Menu className="size-6 text-secondary" strokeWidth={2} />
			</DrawerTrigger>

			<DrawerContent className="bg-secondary border-none l">
				<div className="flex flex-col h-full overflow-y-auto px-[10px] pb-8 pt-[44px]">
					<div className="flex items-center justify-between mb-6">
						<DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
						<DrawerClose
							className="ml-auto flex items-center justify-center p-1"
							aria-label="Close menu"
						>
							<X className="size-6 text-white" strokeWidth={2} />
						</DrawerClose>
					</div>

					<nav className="pb-[30px] flex flex-col">
						<ul className="flex flex-col">
							{menuData.map((item, index) => (
								<li
									key={item.id}
									className={cn(
										'border-b border-[#313E3E] flex items-center',
										index === 0 ? 'pb-[15px]' : 'py-[15px]'
									)}
								>
									<MobileNavLink href={item.path}>{item.menu}</MobileNavLink>
								</li>
							))}
						</ul>
					</nav>

					{status === 'authenticated' ? (
						<div className="flex flex-col gap-3 mb-6">
							<p className="text-white/70 text-sm capitalize">
								{session?.user?.name}
							</p>
							<DrawerClose asChild>
								<Link
									href={profileLink(session?.tenant_type)}
									className="text-white text-lg hover:text-primary transition-colors"
								>
									Profile
								</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link
									href={dashboardLink(session?.tenant_type)}
									className="text-white text-lg hover:text-primary transition-colors"
								>
									Dashboard
								</Link>
							</DrawerClose>
							<button
								type="button"
								onClick={() => logout()}
								className="text-left text-white text-lg hover:text-primary transition-colors"
							>
								Log out
							</button>
						</div>
					) : status === 'unauthenticated' ? (
						<div className="flex flex-col gap-3 mb-6">
							<DrawerClose asChild>
								<Link
									href="/auth?tab=login"
									className="text-white text-lg hover:text-primary transition-colors"
								>
									Login
								</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link
									href="/auth?tab=register"
									className="text-white text-lg hover:text-primary transition-colors"
								>
									Register
								</Link>
							</DrawerClose>
						</div>
					) : null}

					<DrawerClose asChild>
						<Link
							href="/contact-us"
							className="btn--gradient mt-auto inline-block w-full px-[30px] py-[14px] text-center text-white tracking-[1.28px] transition-transform duration-300 rounded-[100px]"
						>
							Book Now
						</Link>
					</DrawerClose>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
