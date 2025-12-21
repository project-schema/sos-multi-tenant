'use client';

import { Container1, DbHeader, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import {
	DropshipperProductFilter,
	DropshipperProductTable,
	useVendorRequestProductQuery,
} from '@/store/features/vendor/dropshipper-request';

import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Dropshipper Request' },
];

export default function PageClient() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useVendorRequestProductQuery(
		{
			status: statusFilter,
			page: page,
			search: debouncedSearchTerm,
		}
	);

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
							<CardTitle>Dropshipper Request</CardTitle>
							<Button
								className="ml-auto"
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
					</>
				}
			>
				{toggleFilter && (
					<DropshipperProductFilter
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						setStatusFilter={setStatusFilter}
						statusFilter={statusFilter}
					/>
				)}
				{(data as any)?.product && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<DropshipperProductTable data={(data as any)?.product} />
						</div>
						<Pagination1
							pagination={(data as any)?.product}
							setPage={setPage}
						/>
					</>
				)}
			</Container1>
		</>
	);
}
