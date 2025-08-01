'use client';

import { DbHeader, Loader5, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { ErrorAlert } from '@/lib';
import {
	MerchantProductFilter,
	MerchantProductStatistics,
	MerchantProductTable,
	useAdminViewProductQuery,
} from '@/store/features/admin/merchant-product';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Merchant Products' },
];

export default function Page() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useAdminViewProductQuery({
		status: statusFilter,
		page: page,
		search: debouncedSearchTerm,
	});

	useEffect(() => {
		setPage(1);
	}, [statusFilter, debouncedSearchTerm]);

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
							Merchant Products
						</CardTitle>
						<Button
							className="ml-auto"
							variant="secondary"
							size="icon"
							onClick={() => setToggleFilter((e) => !e)}
						>
							{toggleFilter ? (
								<ArrowUp className="h-4 w-4" />
							) : (
								<ArrowDown className="h-4 w-4" />
							)}
						</Button>
					</CardHeader>
					{toggleFilter && <MerchantProductStatistics />}
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
								{toggleFilter && (
									<MerchantProductFilter
										searchTerm={searchTerm}
										setSearchTerm={setSearchTerm}
										setStatusFilter={setStatusFilter}
										statusFilter={statusFilter}
									/>
								)}
								{data?.product && (
									<>
										<div className="border rounded-lg relative">
											{isFetching && <Loader8 />}
											<MerchantProductTable data={data?.product} />
										</div>
										<Pagination1 pagination={data?.product} setPage={setPage} />
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
