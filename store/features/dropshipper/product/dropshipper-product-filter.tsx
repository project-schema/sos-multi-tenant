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

export function DropShipperProductFilter({
	filters,
	setFilters,
	clearFilters,
}: {
	filters: {
		searchTerm: string;
		status: string;
		low_to_high: string;
		high_to_low: string;
		top_sale: string;
		category_id: string;
		start_stock: string;
		end_stock: string;
		start_price: string;
		end_price: string;
		start_commission: string;
		end_commission: string;
		rating: string;
		warranty: string;
	};
	setFilters: React.Dispatch<React.SetStateAction<typeof filters>>;
	clearFilters: () => void;
}) {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-4 mb-4">
			{/* Search */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
				<Input
					placeholder="Search by id and name..."
					value={filters.searchTerm}
					onChange={(e) =>
						setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
					}
					className="pl-10"
				/>
			</div>
			{/* Start Stock */}

			<Input
				type="number"
				placeholder="Start Stock"
				value={filters.start_stock}
				onChange={(e) =>
					setFilters((prev) => ({ ...prev, start_stock: e.target.value }))
				}
			/>
			<Input
				type="number"
				placeholder="End Stock"
				value={filters.end_stock}
				onChange={(e) =>
					setFilters((prev) => ({ ...prev, end_stock: e.target.value }))
				}
			/>
			<Input
				type="number"
				placeholder="Start Price"
				value={filters.start_price}
				onChange={(e) =>
					setFilters((prev) => ({ ...prev, start_price: e.target.value }))
				}
			/>
			<Input
				type="number"
				placeholder="End Price"
				value={filters.end_price}
				onChange={(e) =>
					setFilters((prev) => ({ ...prev, end_price: e.target.value }))
				}
			/>
			<Input
				type="number"
				placeholder="Start Commission"
				value={filters.start_commission}
				onChange={(e) =>
					setFilters((prev) => ({ ...prev, start_commission: e.target.value }))
				}
			/>
			<Input
				type="number"
				placeholder="End Commission"
				value={filters.end_commission}
				onChange={(e) =>
					setFilters((prev) => ({ ...prev, end_commission: e.target.value }))
				}
			/>
			<Input
				type="number"
				placeholder="Rating"
				value={filters.rating}
				onChange={(e) =>
					setFilters((prev) => ({ ...prev, rating: e.target.value }))
				}
			/>
			<Input
				type="number"
				placeholder="Warranty"
				value={filters.warranty}
				onChange={(e) =>
					setFilters((prev) => ({ ...prev, warranty: e.target.value }))
				}
			/>

			<Select
				value={filters.category_id}
				onValueChange={(value: string) =>
					setFilters((prev) => ({ ...prev, category_id: value }))
				}
			>
				<SelectTrigger className="w-full h-11">
					<SelectValue placeholder="Category" />
					<SelectContent>
						<SelectItem value="1">Test</SelectItem>
						<SelectItem value="2">Test</SelectItem>
						<SelectItem value="3">Test</SelectItem>
					</SelectContent>
				</SelectTrigger>
			</Select>
			<Select
				value={filters.status}
				onValueChange={(value: string) =>
					setFilters((prev) => ({ ...prev, status: value }))
				}
			>
				<SelectTrigger className="w-full h-11">
					<SelectValue placeholder="Status" />
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="1">Test</SelectItem>
						<SelectItem value="2">Test</SelectItem>
						<SelectItem value="3">Test</SelectItem>
					</SelectContent>
				</SelectTrigger>
			</Select>

			{/* Clear Filters Button */}
			<Button variant="outline" className="h-11" onClick={clearFilters}>
				<XCircle className="mr-2 h-4 w-4" />
				Clear Filters
			</Button>
		</div>
	);
}
