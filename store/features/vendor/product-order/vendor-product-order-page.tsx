'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVendorProductOrderAllQuery } from './vendor-product-order-api-slice';
import { VendorProductOrderFilter } from './vendor-product-order-filter';
import { VendorProductStatistics } from './vendor-product-order-statistics';
import { VendorProductOrderTable } from './vendor-product-order-table';

export function VendorProductOrderPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [statusFilter, setStatusFilter] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } =
		useVendorProductOrderAllQuery({
			page: page,
			search: debouncedSearchTerm,
			status: statusFilter,
		});

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2  flex items-center justify-between">
						<CardTitle>Product Orders</CardTitle>
						<Button
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
				<VendorProductStatistics setStatusFilter={setStatusFilter} />
			)}

			{toggleFilter && (
				<VendorProductOrderFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
				/>
			)}
			{data?.message && (
				<>
					<div className="relative overflow-hidden">
						{isFetching && <Loader8 />}
						<div className="border rounded-lg ">
							<VendorProductOrderTable data={data?.message} />
						</div>
					</div>
					<Pagination1 pagination={data?.message} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
