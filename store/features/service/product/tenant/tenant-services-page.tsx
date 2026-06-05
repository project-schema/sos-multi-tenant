'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { Pagination1 } from '@/components/dashboard/pagination';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { AdminAdvertiseFilter } from '@/store/features/admin/advertise';

import { Plus, SlidersHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VendorServiceTable } from './tenant-service-table';
import { useVendorServicesQuery } from './tenant-services-api-slice';
import { VendorServicesStatistics } from './tenant-services-statistics';

export function TenantServicesPage() {
	const router = useRouter();
	const [toggleFilter, setToggleFilter] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	// Debounced version of searchTerm
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isLoading, isError, isFetching } = useVendorServicesQuery({
		page: page,
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
							<CardTitle>Manage Services</CardTitle>
							<div className="flex items-center gap-2">
								<Button
									title="Create Service"
									variant="outline"
									size="sm"
									onClick={() => router.push('/dashboard/expertise/create')}
								>
									<Plus className="h-4 w-4" />
									Create Service
								</Button>

								<Button
									title="Filter Services"
									variant="outline"
									size="sm"
									onClick={() => setToggleFilter((e) => !e)}
								>
									<SlidersHorizontal className="h-4 w-4" />
								</Button>
							</div>
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
