'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useVendorSupportAllQuery } from './vendor-support-api-slice';
import { VendorSupportFilter } from './vendor-support-filter';
import { VendorSupportStatistics } from './vendor-support-statistics';
import { VendorSupportTable } from './vendor-support-table';

export function VendorSupportPage() {
	const router = useRouter();
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useVendorSupportAllQuery({
		page: page,
		search: debouncedSearchTerm,
	});

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2  flex items-center justify-between">
						<CardTitle>All Support</CardTitle>
						<div className="flex items-center gap-2">
							<Button
								title="Create Support"
								variant="outline"
								size="sm"
								onClick={() => router.push('/dashboard/support/create')}
								type="button"
							>
								<Plus className="h-4 w-4" />
								Create Support
							</Button>
							<Button
								title="Filter Support"
								variant="outline"
								size="sm"
								onClick={() => setToggleFilter((e) => !e)}
								type="button"
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</>
			}
		>
			{toggleFilter && <VendorSupportStatistics />}

			{toggleFilter && (
				<VendorSupportFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
			{data?.message && (
				<>
					<div className="relative overflow-hidden">
						{isFetching && <Loader8 />}
						<div className="border rounded-lg ">
							<VendorSupportTable data={data?.message} />
						</div>
					</div>
					<Pagination1 pagination={data?.message} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
