'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';

import { useEffect, useState } from 'react';
import { useVendorServicesPurchaseQuery } from './api-slice';
import { ServicesPurchaseFilter } from './filter';
import { ServicesPurchaseGrid } from './services-purchase-grid';

export function VendorServicesPurchasePage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);
	const [statusFilter, setStatusFilter] = useState('all');
	const [serviceCategoryFilter, setServiceCategoryFilter] = useState('all');

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } =
		useVendorServicesPurchaseQuery({
			page: page,
			search: debouncedSearchTerm,
			status: statusFilter,
			service_category_id: serviceCategoryFilter,
		});

	useEffect(() => {
		setPage(1);
	}, [debouncedSearchTerm, statusFilter, serviceCategoryFilter]);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Purchase Service</CardTitle>
						</div>
						<ServicesPurchaseFilter
							statusFilter={statusFilter}
							setStatusFilter={setStatusFilter}
							serviceCategoryFilter={serviceCategoryFilter}
							setServiceCategoryFilter={setServiceCategoryFilter}
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					</>
				}
			>
				{data?.data && (
					<>
						<div>
							{isFetching && <Loader8 />}
							<ServicesPurchaseGrid services={data.data} />
						</div>
						<Pagination1 pagination={data} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
