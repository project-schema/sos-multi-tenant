'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search, XCircle } from 'lucide-react';

export function VendorWastageProductsFilter({
	filters,
	setFilters,
	clearFilters,
}: {
	filters: {
		searchTerm: string;
	};
	setFilters: React.Dispatch<React.SetStateAction<typeof filters>>;
	clearFilters: () => void;
}) {
	return (
		<div className="space-y-4">
			<div className="grid  grid-cols-1 md:grid-cols-3 gap-4 ">
				{/* Search Input */}
				<div className="relative w-full">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input
						placeholder="Search by invoice no..."
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
				{/* Clear Filters Button */}
				<div>
					<Button
						variant="outline"
						type="button"
						className="h-11 col-span-1"
						onClick={clearFilters}
					>
						<XCircle className="h-4 w-4" />
						Clear
					</Button>
				</div>
			</div>
		</div>
	);
}
