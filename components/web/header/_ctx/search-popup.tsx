'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { iCategory } from '@/store/features/admin/category';
import { useFrontendCategoriesQuery } from '@/store/features/frontend/product/api-slice';
import { Search } from 'lucide-react';
import { SearchBar } from './search-bar';

export default function SearchPopup() {
	const { data: categories = [] } = useFrontendCategoriesQuery();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					className="flex items-center justify-center text-[#800020] hover:opacity-80 transition-opacity"
					aria-label="Search"
				>
					<Search className="w-6 h-6" />
				</button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<DialogHeader className="sr-only">
					<DialogTitle>Search Products</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<h2 className="text-xl font-semibold text-gray-900">
						Search Products
					</h2>
					<SearchBar
						variant="desktop"
						categories={(categories as iCategory[]) || []}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
