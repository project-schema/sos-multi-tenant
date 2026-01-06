'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';
import { SearchBar } from './search-bar';
import { UtilityIcons } from './utility-icons';

interface MobileMenuProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
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
						<label className="text-sm font-medium text-gray-700">
							Search
						</label>
						<SearchBar variant="mobile" />
					</div>

					{/* Mobile Navigation */}
					<nav className="flex flex-col gap-2">
						<Link
							href="/clothes"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => onOpenChange(false)}
						>
							Clothes
						</Link>
						<Link
							href="/new-arrivals"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => onOpenChange(false)}
						>
							New Arrivals
						</Link>
						<Link
							href="/best-sellers"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => onOpenChange(false)}
						>
							Best Sellers
						</Link>
						<Link
							href="/blog"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => onOpenChange(false)}
						>
							Blog
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2">
									<span>Pages</span>
									<ChevronDown className="w-4 h-4" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-48">
								<DropdownMenuItem asChild>
									<Link
										href="/pages/about"
										onClick={() => onOpenChange(false)}
									>
										About Us
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="/pages/contact"
										onClick={() => onOpenChange(false)}
									>
										Contact
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="/pages/faq"
										onClick={() => onOpenChange(false)}
									>
										FAQ
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</nav>

					{/* Mobile User Actions */}
					<div className="flex flex-col gap-3 pt-4 border-t">
						<Link
							href="/auth"
							className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors py-2"
							onClick={() => onOpenChange(false)}
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
