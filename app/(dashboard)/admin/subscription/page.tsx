'use client';

import { DbHeader, Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorAlert } from '@/lib';
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
							Membership List
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

								<AdminMembershipFilter
									statusFilter={statusFilter}
									setStatusFilter={setStatusFilter}
								/>

								{data && (
									<>
										<div className="border rounded-lg relative">
											{isFetching && <Loader8 />}
											<AdminMembershipTable
												data={data}
												statusFilter={statusFilter}
											/>
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
