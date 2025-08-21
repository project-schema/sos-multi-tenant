'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { format } from 'date-fns';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVendorPurchasePaymentHistoryQuery } from './vendor-purchase-api-slice';
import { VendorPurchasePaymentFilter } from './vendor-purchase-payment-filter';
import { VendorPurchasePaymentTable } from './vendor-purchase-payment-table';

export function VendorPurchasePaymentTablePage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'all' | 'due' | 'paid',
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

	const { data, isLoading, isError, isFetching } =
		useVendorPurchasePaymentHistoryQuery({
			page: page,
			search: debouncedSearchTerm,
			status: filters.status,
			start_date: filters.fromDate
				? format(filters.fromDate, 'dd-MM-yyyy')
				: '',
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
						<CardTitle>Payment History</CardTitle>
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
				<VendorPurchasePaymentFilter
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
				/>
			)}
			{data?.payment_history && (
				<>
					<div className="border rounded-lg relative">
						{isFetching && <Loader8 />}
						<VendorPurchasePaymentTable data={data?.payment_history} />
					</div>
					<Pagination1 pagination={data?.payment_history} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
