'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { iCategory } from '@/store/features/admin/category';
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
	categories: iCategory[];
	selectedCategoryId?: number | null;
	onCategorySelect?: (categoryId: number | null) => void;
}

export function CategoriesDropdown({
	variant = 'default',
	className,
	categories,
	selectedCategoryId,
	onCategorySelect,
}: CategoriesDropdownProps) {
	const selectedCategory = categories?.find(
		(cat) => cat.id === selectedCategoryId
	);

	const handleCategoryClick = (categoryId: number) => {
		if (onCategorySelect) {
			// Toggle: if same category is clicked, deselect it
			onCategorySelect(selectedCategoryId === categoryId ? null : categoryId);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={`flex items-center gap-2 px-4 py-2.5 bg-white border-r border-amber-600 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
				>
					<span className={variant === 'compact' ? 'hidden sm:inline' : ''}>
						{selectedCategory ? selectedCategory.name : 'All Categories'}
					</span>
					{variant === 'compact' && (
						<span className="sm:hidden">
							{selectedCategory ? selectedCategory.name : 'Categories'}
						</span>
					)}
					<ChevronDown className="w-4 h-4" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-48">
				{onCategorySelect && (
					<DropdownMenuItem
						onClick={() => onCategorySelect(null)}
						className={selectedCategoryId === null ? 'bg-gray-100' : ''}
					>
						All Categories
					</DropdownMenuItem>
				)}
				{categories?.map((category) =>
					onCategorySelect ? (
						<DropdownMenuItem
							key={category.id}
							onClick={() => handleCategoryClick(category.id)}
							className={
								selectedCategoryId === category.id ? 'bg-gray-100' : ''
							}
						>
							{category.name}
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem key={category.id} asChild>
							<Link href={`/category/${category?.id}`}>{category?.name}</Link>
						</DropdownMenuItem>
					)
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
