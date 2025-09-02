'use client';

import { Container1, Loader5, Loader8 } from '@/components/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import { ErrorAlert } from '@/lib';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
	useVendorWastageProductsByInvoiceNoQuery,
	useVendorWastageProductsStoreMutation,
} from './wastage-products-api-slice';
import { VendorWastageProductsCreateTable } from './wastage-products-create-table';
import { VendorWastageProductsFilter } from './wastage-products-filter';

export function VendorWastageProductsCreatePage() {
	const [filters, setFilters] = useState({
		searchTerm: '',
	});

	const router = useRouter();

	const [store, { isLoading: isCreating }] =
		useVendorWastageProductsStoreMutation();
	const search = useDebounce(filters.searchTerm, 500);
	const { data, isLoading, isFetching, isError } =
		useVendorWastageProductsByInvoiceNoQuery(
			{
				id: search,
			},
			{
				skip: !search,
				refetchOnMountOrArgChange: false,
				refetchOnFocus: false,
				refetchOnReconnect: false,
			}
		);

	return (
		<Container1
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>Create Wastage</CardTitle>
					</div>
				</>
			}
		>
			<div className="relative">
				{isLoading && <Loader5 />}
				{isFetching && <Loader8 />}

				<Card>
					<CardContent className="space-y-4">
						<VendorWastageProductsFilter
							filters={filters}
							setFilters={setFilters}
							clearFilters={() =>
								setFilters({
									searchTerm: '',
								})
							}
						/>
						{/* Cart Items Table */}
						{!isLoading && !isFetching && data?.status === 200 && (
							<VendorWastageProductsCreateTable data={data?.sales} />
						)}
						{data?.status === 404 && data?.message && (
							<ErrorAlert
								title={data?.message}
								children={
									<>
										<p>Please Check Invoice No</p>
										<ul className="list-inside list-disc text-sm">
											<li>Make Sure Invoice No is Correct</li>
											<li>Try Again After Some Time</li>
											<li>If Problem Persists, Please Contact Support</li>
										</ul>
									</>
								}
							/>
						)}
					</CardContent>
				</Card>
			</div>
		</Container1>
	);
}
