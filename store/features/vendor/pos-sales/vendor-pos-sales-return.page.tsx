'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { VendorPosSalesOrderFilter } from './vendor-pos-sales-order.filter';
import { VendorPosSalesReturnTable } from './vendor-pos-sales-return.table';
import { useVendorPosSalesAllReturnQuery } from './vendor-pos-sales.api-slice';

export function VendorPosSalesReturnPage() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'all' | 'due' | 'paid',
		start_date: undefined as Date | undefined,
		end_date: undefined as Date | undefined,
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			start_date: undefined,
			end_date: undefined,
		});
	};

	const [page, setPage] = useState(1);

	// Debounced version
	const searchTerm = useDebounce(filters.searchTerm, 500);

	// Fetch
	const { data, isLoading, isError, isFetching } =
		useVendorPosSalesAllReturnQuery({
			page: page,
			search: searchTerm,
			status: filters.status,
			start_date: filters.start_date
				? format(filters.start_date, 'dd-MM-yyyy')
				: '',
			end_date: filters.end_date ? format(filters.end_date, 'dd-MM-yyyy') : '',
		});

	useEffect(() => {
		setPage(1);
	}, [filters]);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>POS Sales Returns</CardTitle>}
			>
				<VendorPosSalesOrderFilter
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
				/>
				{data?.return_list && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<VendorPosSalesReturnTable data={data?.return_list} />
						</div>
					</>
				)}
			</Container1>
		</>
	);
}
