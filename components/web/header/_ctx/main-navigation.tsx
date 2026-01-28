'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { iCategory } from '@/store/features/admin/category';
import { ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';
import { UtilityIcons } from './utility-icons';

const categories = [
	'Electronics',
	'Clothing',
	'Home & Garden',
	'Sports',
	'Books',
	'Toys',
];

function CategoriesDropdownButton({ categories }: { categories: iCategory[] }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center gap-2 bg-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3.5 hover:bg-orange-600 transition-colors font-medium whitespace-nowrap text-sm">
					<Menu className="w-4 h-4 sm:w-5 sm:h-5" />
					<span className="hidden sm:inline">All Categories</span>
					<span className="sm:hidden">Categories</span>
					<ChevronDown className="w-4 h-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-48">
				{categories?.map((category) => (
					<DropdownMenuItem key={category.id} asChild>
						<Link href={`/category/${category.id}`}>{category?.name}</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function MainNavigation({
	categories,
}: {
	categories: iCategory[] | null;
}) {
	return (
		<div className="md:block hidden bg-gray-100 border-b border-gray-200">
			<div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between gap-4 py-3">
					<div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
						{/* Categories Button */}
						{categories && <CategoriesDropdownButton categories={categories} />}

						{/* Navigation Links - Desktop */}
						<nav className="hidden md:flex items-center gap-6">
							<Link
								href="/clothes"
								className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
							>
								Clothes
							</Link>
							<Link
								href="/new-arrivals"
								className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
							>
								New Arrivals
							</Link>
							<Link
								href="/best-sellers"
								className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
							>
								Best Sellers
							</Link>
							<Link
								href="/blog"
								className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap"
							>
								Blog
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors whitespace-nowrap">
										<span>Pages</span>
										<ChevronDown className="w-4 h-4" />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start" className="w-48">
									<DropdownMenuItem asChild>
										<Link href="/pages/about">About Us</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/pages/contact">Contact</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/pages/faq">FAQ</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</nav>
					</div>

					<UtilityIcons variant="desktop" />
				</div>
			</div>
		</div>
	);
}
