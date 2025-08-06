'use client';

import { Container1, DbHeader, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { CardTitle } from '@/components/ui/card';
import {
	AdminMembershipFilter,
	AdminMembershipTable,
	useAdminMembershipQuery,
} from '@/store/features/admin/membership';

import { useEffect, useState } from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Membership' },
];

export default function Page() {
	const [statusFilter, setStatusFilter] = useState<'vendor' | 'affiliate'>(
		'vendor'
	);
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, isFetching } = useAdminMembershipQuery({
		status: statusFilter,
		page: page,
	});

	useEffect(() => {
		setPage(1);
	}, [statusFilter]);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Membership List</CardTitle>}
			>
				<AdminMembershipFilter
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
				/>
				{data && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<AdminMembershipTable data={data} statusFilter={statusFilter} />
						</div>
						<Pagination1 pagination={data} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
