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
import { SearchBar } from './search-bar';
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
			<SheetContent side="left" className="w-[300px] sm:w-[400px]">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="mt-6 flex flex-col gap-4 p-4">
					{/* Mobile Search */}
					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700">Search</label>
						<SearchBar variant="mobile" categories={[]} cms={cms} />
					</div>

					{/* Mobile Navigation */}
					<nav className="flex flex-col gap-2">
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
					<div className="flex flex-col gap-3 pt-4 border-t">
						<Link
							href="/auth"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => setOpen(false)}
						>
							Log In / Register
						</Link>
						<UtilityIcons variant="mobile" />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
