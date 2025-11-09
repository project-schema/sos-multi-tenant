'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUserSupportAllQuery } from './api-slice';
import { UserSupportFilter } from './filter';
import { UserSupportStatistics } from './statistics';
import { UserSupportTable } from './table';

export function UserSupportPage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useUserSupportAllQuery({
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
						<Button
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
			{toggleFilter && <UserSupportStatistics />}

			{toggleFilter && (
				<UserSupportFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}
			{data?.message && (
				<>
					<div className="relative overflow-hidden">
						{isFetching && <Loader8 />}
						<div className="border rounded-lg ">
							<UserSupportTable data={data?.message} />
						</div>
					</div>
					<Pagination1 pagination={data?.message} setPage={setPage} />
				</>
			)}
		</Container1>
	);
}
