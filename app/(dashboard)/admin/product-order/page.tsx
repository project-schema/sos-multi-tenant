'use client';

import { Container1, DbHeader, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import {
	AdminProductOrderFilter,
	AdminProductOrderStatistics,
	AdminProductOrderTable,
	useAdminProductOrderQuery,
} from '@/store/features/admin/product-order';

import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Product Order' },
];

export default function Page() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useAdminProductOrderQuery({
		status: statusFilter,
		page: page,
		search: debouncedSearchTerm,
	});

	useEffect(() => {
		setPage(1);
	}, [statusFilter, debouncedSearchTerm]);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Product Order</CardTitle>
							<Button
								className="ml-auto"
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
						{toggleFilter && <AdminProductOrderStatistics />}
					</>
				}
			>
				{/* Filter */}
				{toggleFilter && (
					<>
						<AdminProductOrderFilter
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
							setStatusFilter={setStatusFilter}
							statusFilter={statusFilter}
						/>
					</>
				)}
				{data?.message && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<AdminProductOrderTable data={data?.message} />
						</div>
						<Pagination1 pagination={data?.message} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
