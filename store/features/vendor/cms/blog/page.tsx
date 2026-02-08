'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { useEffect, useState } from 'react';
import { useCmsBlogQuery } from './api-slice';
import { CmsBlogCreateModal } from './create-modal';
import { CmsBlogFilter } from './filter';
import { CmsBlogTable } from './table';

export function CmsBlogPage() {
	const [filters, setFilters] = useState({
		searchTerm: '',
		status: 'all',
		categoryId: 'all',
	});

	const clearFilters = () => {
		setFilters({
			searchTerm: '',
			status: 'all',
			categoryId: 'all',
		});
	};

	const [page, setPage] = useState(1);

	// Debounced search term
	const searchTerm = useDebounce(filters.searchTerm, 500);

	// Fetch data
	const { data, isLoading, isError, isFetching } = useCmsBlogQuery({
		page: page,
		search: searchTerm,
		status: filters.status !== 'all' ? filters.status : '',
		category_id: filters.categoryId !== 'all' ? filters.categoryId : '',
	});

	useEffect(() => {
		setPage(1);
	}, [filters]);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<div className="flex items-center justify-between">
					<CardTitle>Blogs</CardTitle>
					<CmsBlogCreateModal />
				</div>
			}
		>
			{/* Filter */}
			<CmsBlogFilter
				filters={filters}
				setFilters={setFilters}
				clearFilters={clearFilters}
			/>

			{data?.message && (
				<>
					<div className="border rounded-lg relative">
						{isFetching && <Loader8 />}
						<CmsBlogTable data={data?.news || []} />
					</div>
					{/* <Pagination1 pagination={data?.news} setPage={setPage} /> */}
				</>
			)}
		</Container1>
	);
}
