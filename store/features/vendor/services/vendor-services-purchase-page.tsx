'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { AdminAdvertiseFilter } from '@/store/features/admin/advertise';

import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVendorServicesQuery } from './vendor-services-api-slice';
import { VendorServicesStatistics } from './vendor-services-statistics';
import { VendorServiceTable } from './vendor.service.table';

export function VendorServicesPurchasePage() {
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useVendorServicesQuery();

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
							<CardTitle>Purchase Order</CardTitle>
							<Button
								className="ml-auto"
								variant="outline"
								size="icon"
								onClick={() => setToggleFilter((e) => !e)}
							>
								<SlidersHorizontal className="h-4 w-4" />
							</Button>
						</div>
						{toggleFilter && <VendorServicesStatistics />}
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
				{data?.message && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<VendorServiceTable data={data?.message} />
						</div>
						<Pagination1 pagination={data?.message} setPage={setPage} />
					</>
				)}
			</Container1>
		</>
	);
}
