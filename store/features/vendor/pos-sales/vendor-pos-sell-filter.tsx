'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectSearch } from '@/components/ui/searchable-select';

import { Barcode, Search, XCircle } from 'lucide-react';
import { iVendorPosSalesResponse } from './vendor-pos-sales.type';

export function VendorPosSellFilter({
	filters,
	setFilters,
	clearFilters,
	data,
}: {
	filters: {
		searchTerm: string;
		brand_id: string;
		category_id: string;
	};
	setFilters: React.Dispatch<React.SetStateAction<typeof filters>>;
	clearFilters: () => void;
	data?: iVendorPosSalesResponse;
}) {
	return (
		<div className="space-y-4">
			<div className="grid  grid-cols-1 md:grid-cols-2 gap-4 ">
				{/* Search Input */}
				<div className="relative w-full">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input
						placeholder="Search by product name/sku..."
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
				<div className="relative w-full">
					<Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
					<Input className="pl-10" placeholder="Scan Barcode..." />
				</div>
			</div>
			<div className="grid grid-cols-7 gap-4">
				<div className="col-span-6 grid grid-cols-2 gap-4">
					<SelectSearch
						value={filters.category_id}
						options={
							data?.data?.category?.map((category) => ({
								label: category.name,
								value: category.id.toString(),
							})) ?? []
						}
						placeholder="Select Category"
						onSelectorClick={(value) => {
							setFilters((prev) => ({
								...prev,
								category_id: value.value,
							}));
						}}
					/>
					<SelectSearch
						value={filters.brand_id}
						options={
							data?.data?.brand?.map((brand) => ({
								label: brand.name,
								value: brand.id.toString(),
							})) ?? []
						}
						placeholder="Select Brand"
						onSelectorClick={(value) => {
							setFilters((prev) => ({
								...prev,
								brand_id: value.value,
							}));
						}}
					/>
				</div>
				{/* Clear Filters Button */}
				<Button
					variant="outline"
					className="h-11 col-span-1"
					onClick={clearFilters}
				>
					<XCircle className="h-4 w-4" />
					Clear
				</Button>
			</div>
		</div>
	);
}
