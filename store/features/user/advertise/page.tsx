'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { AdminAdvertiseFilter } from '@/store/features/admin/advertise';

import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUserAdvertiseQuery } from './api-slice';
import { UserAdvertiseStatistics } from './statistics';
import { UserAdvertiseTable } from './table';

export function UserAdvertisePage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useUserAdvertiseQuery({
		page: page,
		search: debouncedSearchTerm,
	});

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm]);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Manage Advertise</CardTitle>
							<Button
								className="ml-auto"
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
						{toggleFilter && <UserAdvertiseStatistics />}
					</>
				}
			>
				{/* Filter */}
				{toggleFilter && (
					<AdminAdvertiseFilter
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				)}
				{data?.data && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<UserAdvertiseTable data={data?.data} />
						</div>
						<Pagination1 pagination={data?.data} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
