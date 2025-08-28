'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';

import { Pagination1 } from '@/components/dashboard/pagination';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { VendorPosSalesOrderFilter } from './vendor-pos-sales-order.filter';
import { VendorPosSalesOrderTable } from './vendor-pos-sales-order.table';
import { useVendorPosSalesAllOrdersQuery } from './vendor-pos-sales.api-slice';

export function VendorPosSalesOrdersPage() {
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
		useVendorPosSalesAllOrdersQuery({
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
				header={<CardTitle>POS Sales Orders</CardTitle>}
			>
				<VendorPosSalesOrderFilter
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
				/>
				{data?.product_sales && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<VendorPosSalesOrderTable data={data?.product_sales} />
						</div>
						<Pagination1 pagination={data?.product_sales} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
