'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const categories = [
	'Electronics',
	'Clothing',
	'Home & Garden',
	'Sports',
	'Books',
	'Toys',
];

interface CategoriesDropdownProps {
	variant?: 'default' | 'compact';
	className?: string;
}

export function CategoriesDropdown({
	variant = 'default',
	className,
}: CategoriesDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={`flex items-center gap-2 px-4 py-2.5 bg-white border-r border-amber-600 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
				>
					<span className={variant === 'compact' ? 'hidden sm:inline' : ''}>
						All Categories
					</span>
					{variant === 'compact' && (
						<span className="sm:hidden">Categories</span>
					)}
					<ChevronDown className="w-4 h-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-48">
				{categories.map((category) => (
					<DropdownMenuItem key={category} asChild>
						<Link href={`/category/${category.toLowerCase()}`}>
							{category}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
