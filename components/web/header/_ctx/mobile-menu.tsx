'use client';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { iSystem } from '@/store/features/vendor/cms/system/type';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './logo';
import { SearchBar } from './search-bar';
import { UserAccountMobile } from './user-account-mobile';
import { UtilityIcons } from './utility-icons';

export function MobileMenu({ cms }: { cms: iSystem | null }) {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<button className="lg:hidden w-10 h-10 flex items-center justify-center">
					<Menu className="w-6 h-6 text-black" />
				</button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="w-[300px] sm:w-[400px] max-h-[100svh-60px] overflow-y-auto"
			>
				<SheetHeader hidden>
					<SheetTitle>Mobile Navigation</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col gap-8 p-4 pt-10">
					<Logo logo={cms?.logo ?? ''} className="w-full h-10 mx-auto" />
					{/* Mobile Search */}
					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700">Search</label>
						<SearchBar variant="mobile" categories={[]} cms={cms} />
					</div>

					{/* Mobile Navigation */}
					<nav className="flex flex-col gap-2">
						<label className="text-sm font-medium text-black  pb-2 border-b">
							Navigation
						</label>
						<Link
							href="/"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => setOpen(false)}
						>
							Home
						</Link>
						<Link
							href="/shop"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => setOpen(false)}
						>
							Shop
						</Link>
						<Link
							href="/blog"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => setOpen(false)}
						>
							Blog
						</Link>
						<Link
							href="/contact"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => setOpen(false)}
						>
							Contact
						</Link>
					</nav>

					{/* Mobile User Actions */}
					<div className="flex flex-col gap-8 pt-8 border-t">
						<UserAccountMobile cms={cms} />
						<UtilityIcons variant="mobile" />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
