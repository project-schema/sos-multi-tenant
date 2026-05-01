'use client';

import { Container1, DbHeader, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import {
	AdminWithdrawalFilter,
	AdminWithdrawalTable,
	useAdminWithdrawalQuery,
} from '@/store/features/admin/withdrawal';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Withdrawal' },
];

export default function Page() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'all' | 'success' | 'pending',
		type: 'all' as 'all' | 'vendor' | 'affiliator' | 'user',
		fromDate: undefined as Date | undefined,
		toDate: undefined as Date | undefined,
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			type: 'all',
			fromDate: undefined,
			toDate: undefined,
		});
	};

	const [page, setPage] = useState(1);

	// Debounced version
	const searchTerm = useDebounce(filters.searchTerm, 500);

	// Fetch
	const { data, isLoading, isError, isFetching } = useAdminWithdrawalQuery({
		page: page,
		search: searchTerm,
		status: filters.status,
		type: filters.type,
		to: filters.toDate ? format(filters.toDate, 'dd-MM-yyyy') : '',
		from: filters.fromDate ? format(filters.fromDate, 'dd-MM-yyyy') : '',
	});

	useEffect(() => {
		setPage(1);
	}, [filters]);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Withdrawal</CardTitle>}
			>
				{/* Filter */}
				<AdminWithdrawalFilter
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
				/>

				{data?.message && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<AdminWithdrawalTable data={data?.message} />
						</div>
						<Pagination1 pagination={data?.message} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
