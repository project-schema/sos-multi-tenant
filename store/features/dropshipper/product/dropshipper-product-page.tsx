'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDropShipperProductAllQuery } from './dropshipper-product-api-slice';
import { DropShipperProductCard } from './dropshipper-product-card';
import { DropShipperProductFilter } from './dropshipper-product-filter';
import { DropShipperProductTable } from './dropshipper-product-table';

// Local storage key for view preference
const VIEW_PREFERENCE_KEY = 'vendor-product-view-preference';

export default function DropShipperProductPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'answer' | 'close' | 'pending' | 'all',
		low_to_high: '',
		high_to_low: '',
		top_sale: '',
		category_id: '',
		start_stock: '',
		end_stock: '',
		start_price: '',
		end_price: '',
		start_commission: '',
		end_commission: '',
		rating: '',
		warranty: '',
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			low_to_high: '',
			high_to_low: '',
			top_sale: '',
			category_id: '',
			start_stock: '',
			end_stock: '',
			start_price: '',
			end_price: '',
			start_commission: '',
			end_commission: '',
			rating: '',
			warranty: '',
		});
	};
	const [page, setPage] = useState(1);
	const [viewMode, setViewMode] = useState<'list' | 'card'>(() => {
		const savedViewMode = localStorage.getItem(VIEW_PREFERENCE_KEY);
		return savedViewMode === 'card' || savedViewMode === 'list'
			? savedViewMode
			: 'list';
	});

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);
	const debouncedLowToHigh = useDebounce(filters.low_to_high, 500);
	const debouncedHighToLow = useDebounce(filters.high_to_low, 500);
	const debouncedTopSale = useDebounce(filters.top_sale, 500);
	const debouncedCategoryId = useDebounce(filters.category_id, 500);
	const debouncedStartStock = useDebounce(filters.start_stock, 500);
	const debouncedEndStock = useDebounce(filters.end_stock, 500);
	const debouncedStartPrice = useDebounce(filters.start_price, 500);
	const debouncedEndPrice = useDebounce(filters.end_price, 500);
	const debouncedStartCommission = useDebounce(filters.start_commission, 500);
	const debouncedEndCommission = useDebounce(filters.end_commission, 500);
	const debouncedRating = useDebounce(filters.rating, 500);
	const debouncedWarranty = useDebounce(filters.warranty, 500);

	const { data, isLoading, isError, isFetching } =
		useDropShipperProductAllQuery({
			page: page,
			search: debouncedSearchTerm,
			low_to_high: debouncedLowToHigh,
			high_to_low: debouncedHighToLow,
			top_sale: debouncedTopSale,
			category_id: debouncedCategoryId,
			start_stock: debouncedStartStock,
			end_stock: debouncedEndStock,
			start_price: debouncedStartPrice,
			end_price: debouncedEndPrice,
			start_commission: debouncedStartCommission,
			end_commission: debouncedEndCommission,
			rating: debouncedRating,
			warranty: debouncedWarranty,
		});

	useEffect(() => {
		localStorage.setItem(VIEW_PREFERENCE_KEY, viewMode);
	}, [viewMode]);

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	const toggleViewMode = () => {
		setViewMode((prev) => (prev === 'list' ? 'card' : 'list'));
	};

	return (
		<Container1
			isError={false}
			isLoading={false}
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>All Products</CardTitle>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="icon"
								onClick={toggleViewMode}
								title={`Switch to ${
									viewMode === 'list' ? 'card' : 'list'
								} view`}
							>
								{viewMode === 'list' ? (
									<Grid3X3 className="h-4 w-4" />
								) : (
									<List className="h-4 w-4" />
								)}
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</>
			}
		>
			{toggleFilter && (
				<DropShipperProductFilter
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
				/>
			)}
			{data?.products && (
				<>
					<div className="relative overflow-hidden">
						{isFetching && <Loader8 />}
						{viewMode === 'list' ? (
							<div className="border rounded-lg ">
								<DropShipperProductTable data={data?.products} />
							</div>
						) : (
							<DropShipperProductCard data={data?.products} />
						)}
					</div>
					<Pagination1 pagination={data?.products} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
