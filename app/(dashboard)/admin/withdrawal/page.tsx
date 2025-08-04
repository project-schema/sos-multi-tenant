'use client';

import { DbHeader, Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { ErrorAlert } from '@/lib';
import { CreateCouponModal } from '@/store/features/admin/coupon';
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

	if (isError) {
		return <ErrorAlert />;
	}

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">Withdrawal</CardTitle>
						<CreateCouponModal />
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Table */}
						{isLoading ? (
							<>
								<Loader5 />
								<Loader5 />
								<Loader5 />
							</>
						) : (
							<>
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
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
}
