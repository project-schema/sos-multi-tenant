'use client';

import { Search } from 'lucide-react';
import { CategoriesDropdown } from './categories-dropdown';

interface SearchBarProps {
	variant?: 'desktop' | 'mobile';
	className?: string;
}

export function SearchBar({ variant = 'desktop', className }: SearchBarProps) {
	if (variant === 'mobile') {
		return (
			<div className={`flex w-full border border-gray-300 overflow-hidden rounded-md ${className}`}>
				<input
					type="text"
					placeholder="Search for products"
					className="flex-1 px-4 py-2.5 outline-none text-sm text-gray-700 placeholder:text-gray-400"
				/>
				<button className="bg-orange-500 text-white w-10 h-10 hover:bg-orange-600 transition-colors flex items-center justify-center">
					<Search className="w-5 h-5" />
				</button>
			</div>
		);
	}

	return (
		<div className={`flex w-full border border-amber-600 overflow-hidden rounded-md ${className}`}>
			<CategoriesDropdown />
			<input
				type="text"
				placeholder="Search for products"
				className="flex-1 px-4 py-2.5 outline-none text-sm text-gray-700 placeholder:text-gray-400"
			/>
			<button className="bg-orange-500 m-1 text-white w-10 h-10 hover:bg-orange-600 transition-colors flex items-center justify-center rounded">
				<Search className="w-5 h-5" />
			</button>
		</div>
	);
}
