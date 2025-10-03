'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { UserWithdrawModal } from '../../user-profile/user-withdraw-modal';
import { useVendorWithdrawAllQuery } from './vendor-withdraw-api-slice';
import { VendorWithdrawFilter } from './vendor-withdraw-filter';
import { VendorWithdrawTable } from './vendor-withdraw-table';

export default function VendorWithdrawPage() {
	const [statusFilter, setStatusFilter] = useState('all');
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, isFetching } = useVendorWithdrawAllQuery({
		page: page,
		status: statusFilter,
	});

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2  flex items-center justify-between">
						<CardTitle>All Withdraw</CardTitle>
						<div className="flex items-center gap-2">
							<UserWithdrawModal />
						</div>
					</div>
				</>
			}
		>
			<VendorWithdrawFilter
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilter}
			/>

			{data?.message && (
				<>
					<div className="relative overflow-hidden">
						{isFetching && <Loader8 />}

						<div className="border rounded-lg ">
							<VendorWithdrawTable data={data?.message} />
						</div>
					</div>
					<Pagination1 pagination={data?.message} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
