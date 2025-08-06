'use client';
import { Container1, DbHeader, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { useAdminAllCouponRequestQuery } from '@/store/features/admin/coupon';
import { AdminCouponRequestFilter } from '@/store/features/admin/coupon/admin.coupon.request.filter';
import { AdminCouponRequestTable } from '@/store/features/admin/coupon/admin.coupon.request.table';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Merchant Products' },
];

export default function Page() {
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } =
		useAdminAllCouponRequestQuery({
			page: page,
			search: debouncedSearchTerm,
		});

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Requested Coupon</CardTitle>}
			>
				{/* Filter */}
				<AdminCouponRequestFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>

				{data?.data && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<AdminCouponRequestTable data={data} />
						</div>
						<Pagination1 pagination={data} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
