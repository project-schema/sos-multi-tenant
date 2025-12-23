'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';

import { Pagination1 } from '@/components/dashboard/pagination';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AdminServiceFilter } from '../../admin/service';
import { useUserServiceOrderQuery } from './api-slice';
import { UserServiceStatistics } from './statistics';
import { UserServiceTable } from './table';

export function UserServicePage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useUserServiceOrderQuery({
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
							<CardTitle>Services Order</CardTitle>
							<Button
								className="ml-auto"
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
						{toggleFilter && <UserServiceStatistics />}
					</>
				}
			>
				{/* Filter */}
				{toggleFilter && (
					<AdminServiceFilter
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				)}
				{data?.data && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<UserServiceTable data={data?.data} />
						</div>
						<Pagination1 pagination={data?.data} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
