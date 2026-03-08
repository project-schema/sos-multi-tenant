'use client';

import { cn } from '@/lib';
import { menuData } from '@/lib/data/NavMenu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavList = ({ item }: { item: (typeof menuData)[number] }) => {
	const pathname = usePathname();

	return (
		<li>
			<Link
				href={item.path}
				className={cn(
					`text-secondary text-[16px] leading-[18px] flex items-center gap-[6.5px] py-[40px] hover:text-primary transition-transform duration-200 ${pathname === item.path ? 'text-primary' : ''}`,
				)}
			>
				{item.menu}
			</Link>
		</li>
	);
};
