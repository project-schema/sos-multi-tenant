'use client';

import { Container1, DbHeader, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import {
	AdminCouponFilter,
	AdminCouponTable,
	CreateCouponModal,
	useAdminCouponQuery,
} from '@/store/features/admin/coupon';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Active Coupons' },
];

export default function Page() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		startAmount: '',
		endAmount: '',
		startCommission: '',
		endCommission: '',
		fromDate: undefined as Date | undefined,
		toDate: undefined as Date | undefined,
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			startAmount: '',
			endAmount: '',
			startCommission: '',
			endCommission: '',
			fromDate: undefined,
			toDate: undefined,
		});
	};

	const [page, setPage] = useState(1);

	// Debounced version
	const searchTerm = useDebounce(filters.searchTerm, 500);
	const endAmount = useDebounce(filters.endAmount, 500);
	const startAmount = useDebounce(filters.startAmount, 500);
	const endCommission = useDebounce(filters.endCommission, 500);
	const startCommission = useDebounce(filters.startCommission, 500);

	// Fetch
	const { data, isLoading, isError, isFetching } = useAdminCouponQuery({
		page: page,
		search: searchTerm,
		end_amount: endAmount,
		start_amount: startAmount,
		end_commission: endCommission,
		start_commission: startCommission,
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
				header={
					<div className="flex items-center justify-between">
						<CardTitle>Active Coupon</CardTitle>
						<CreateCouponModal />
					</div>
				}
			>
				{/* Filter */}
				<AdminCouponFilter
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
				/>

				{data?.message && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<AdminCouponTable data={data?.message} />
						</div>
						<Pagination1 pagination={data?.message} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
