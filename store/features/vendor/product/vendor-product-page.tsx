'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVendorProductAllQuery } from './vendor-product-api-slice';
import { VendorProductCard } from './vendor-product-card';
import { VendorProductFilter } from './vendor-product-filter';
import { VendorProductTable } from './vendor-product-table';

// Local storage key for view preference
const VIEW_PREFERENCE_KEY = 'vendor-product-view-preference';

export default function VendorProductPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);
	const [viewMode, setViewMode] = useState<'list' | 'card'>(() => {
		const savedViewMode = localStorage.getItem(VIEW_PREFERENCE_KEY);
		return savedViewMode === 'card' || savedViewMode === 'list'
			? savedViewMode
			: 'list';
	});

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useVendorProductAllQuery({
		page: page,
		search: debouncedSearchTerm,
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
			isError={isError}
			isLoading={isLoading}
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
				<VendorProductFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
			{data?.product && (
				<>
					<div className="relative overflow-hidden">
						{isFetching && <Loader8 />}
						{viewMode === 'list' ? (
							<div className="border rounded-lg ">
								<VendorProductTable data={data?.product} />
							</div>
						) : (
							<VendorProductCard data={data?.product} />
						)}
					</div>
					<Pagination1 pagination={data?.product} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
