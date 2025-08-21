'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { format } from 'date-fns';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVendorPurchaseQuery } from './vendor-purchase-api-slice';
import { VendorPurchaseFilter } from './vendor-purchase-filter';
import { VendorPurchaseTable } from './vendor-purchase-table';

export function VendorPurchaseTablePage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'all' | 'received' | 'ordered',
		fromDate: undefined as Date | undefined,
		toDate: undefined as Date | undefined,
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			fromDate: undefined,
			toDate: undefined,
		});
	};

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useVendorPurchaseQuery({
		page: page,
		search: debouncedSearchTerm,
		status: filters.status,
		start_date: filters.fromDate ? format(filters.fromDate, 'dd-MM-yyyy') : '',
		end_date: filters.toDate ? format(filters.toDate, 'dd-MM-yyyy') : '',
	});

	useEffect(() => {
		setPage(1);
	}, [filters]);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>All Purchases</CardTitle>
						<Button
							className="ml-auto"
							variant="outline"
							size="icon"
							onClick={() => setToggleFilter((e) => !e)}
						>
							<SlidersHorizontal className="h-4 w-4" />
						</Button>
					</div>
				</>
			}
		>
			{toggleFilter && (
				<VendorPurchaseFilter
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
				/>
			)}
			{data?.product_purchase && (
				<>
					<div className="border rounded-lg relative">
						{isFetching && <Loader8 />}
						<VendorPurchaseTable data={data?.product_purchase} />
					</div>
					<Pagination1 pagination={data?.product_purchase} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
