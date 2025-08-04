'use client';
import { DbHeader, Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { ErrorAlert } from '@/lib';
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

	if (isError) {
		return <ErrorAlert />;
	}

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<div className="db-container space-y-6">
				<Card className="gap-0">
					<CardHeader className="pb-3 flex items-center justify-between">
						<CardTitle className="text-2xl font-bold">
							Requested Coupon
						</CardTitle>
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
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
}
