'use client';

import { DbHeader, Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { ErrorAlert } from '@/lib';
import {
	AdminSupportFilter,
	AdminSupportTable,
	useAdminSupportQuery,
} from '@/store/features/admin/support';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Support' },
];

export default function Page() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all' as 'answer' | 'close' | 'pending' | 'all',
		start_date: undefined as Date | undefined,
		end_date: undefined as Date | undefined,
		category: '',
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			start_date: undefined,
			end_date: undefined,
			category: '',
		});
	};

	const [page, setPage] = useState(1);

	// Debounced version
	const searchTerm = useDebounce(filters.searchTerm, 500);

	// Fetch
	const { data, isLoading, isError, isFetching } = useAdminSupportQuery({
		page: page,
		search: searchTerm,
		status: filters.status,
		start_date: filters.start_date
			? format(filters.start_date, 'dd-MM-yyyy')
			: '',
		end_date: filters.end_date ? format(filters.end_date, 'dd-MM-yyyy') : '',
		category: filters.category,
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
						<CardTitle className="text-2xl font-bold">Support</CardTitle>
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
								<AdminSupportFilter
									filters={filters}
									setFilters={setFilters}
									clearFilters={clearFilters}
								/>

								{data?.message && (
									<>
										<div className="border rounded-lg relative">
											{isFetching && <Loader8 />}
											<AdminSupportTable data={data?.message} />
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
