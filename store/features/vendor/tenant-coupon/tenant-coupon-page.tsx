'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTenantCouponQuery } from './api-slice';
import { CreateCouponModal } from './coupon-create-modal';
import { AdminCouponFilter } from './coupon-filter';
import { AdminCouponTable } from './table';

export function TenantCouponPage() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all',
		discountType: 'all',
		validFrom: undefined as Date | undefined,
		validTo: undefined as Date | undefined,
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			discountType: 'all',
			validFrom: undefined,
			validTo: undefined,
		});
	};

	const [page, setPage] = useState(1);

	// Debounced search term
	const searchTerm = useDebounce(filters.searchTerm, 500);

	// Fetch data
	const { data, isLoading, isError, isFetching } = useTenantCouponQuery({
		page: page,
		search: searchTerm,
		status: filters.status !== 'all' ? filters.status : '',
		discount_type: filters.discountType !== 'all' ? filters.discountType : '',
		valid_from: filters.validFrom
			? format(filters.validFrom, 'yyyy-MM-dd')
			: '',
		valid_to: filters.validTo ? format(filters.validTo, 'yyyy-MM-dd') : '',
	});

	useEffect(() => {
		setPage(1);
	}, [filters]);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<div className="flex items-center justify-between">
					<CardTitle>Coupons</CardTitle>
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
						<AdminCouponTable data={data?.data} />
					</div>
					{/* <Pagination1 pagination={data?.data} setPage={setPage} /> */}
				</>
			)}
		</Container1>
	);
}
