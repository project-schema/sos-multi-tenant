'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Search, XCircle } from 'lucide-react';
import { useCmsViewCategoryQuery } from '../blog-category/category.api.slice';

export function CmsBlogFilter({
	filters,
	setFilters,
	clearFilters,
}: {
	filters: {
		searchTerm: string;
		status: string;
		categoryId: string;
	};
	setFilters: React.Dispatch<React.SetStateAction<typeof filters>>;
	clearFilters: () => void;
}) {
	const { data: categoryData } = useCmsViewCategoryQuery({ page: 1 });

	return (
		<div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
			{/* Search Input */}
			<div className="relative w-full">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder="Search by title..."
					value={filters.searchTerm}
					onChange={(e) =>
						setFilters((prev) => ({
							...prev,
							searchTerm: e.target.value,
						}))
					}
					className="pl-10"
				/>
			</div>

			{/* Status Filter */}
			<Select
				value={filters.status}
				onValueChange={(value) =>
					setFilters((prev) => ({ ...prev, status: value }))
				}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="All Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Status</SelectItem>
					<SelectItem value="active">Active</SelectItem>
					<SelectItem value="inactive">Inactive</SelectItem>
				</SelectContent>
			</Select>

			{/* Category Filter */}
			<Select
				value={filters.categoryId}
				onValueChange={(value) =>
					setFilters((prev) => ({ ...prev, categoryId: value }))
				}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="All Categories" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All Categories</SelectItem>
					{categoryData?.categories?.map((category) => (
						<SelectItem key={category.id} value={String(category.id)}>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{/* Clear Filters Button */}
			<Button variant="outline" className="h-10" onClick={clearFilters}>
				<XCircle className="mr-2 h-4 w-4" />
				Clear
			</Button>
		</div>
	);
}
