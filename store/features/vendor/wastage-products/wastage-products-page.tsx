'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';

import { useVendorWastageProductsAllQuery } from './wastage-products-api-slice';
import { VendorWastageProductsTable } from './wastage-products-table';

export function VendorWastageProductsPage() {
	// Fetch
	const { data, isLoading, isError, isFetching } =
		useVendorWastageProductsAllQuery(undefined);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Wastage Products</CardTitle>}
			>
				{data?.return_list && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<VendorWastageProductsTable data={data?.return_list} />
						</div>
					</>
				)}
			</Container1>
		</>
	);
}
