'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';

import { useVendorDamageProductsAllQuery } from './damage-products-api-slice';
import { VendorDamageProductsTable } from './damage-products-table';

export function VendorDamageProductsPage() {
	// Fetch
	const { data, isLoading, isError, isFetching } =
		useVendorDamageProductsAllQuery(undefined);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Damage Products</CardTitle>}
			>
				{data?.damages && (
					<>
						<div className="border rounded-lg relative">
							{isFetching && <Loader8 />}
							<VendorDamageProductsTable data={data?.damages} />
						</div>
					</>
				)}
			</Container1>
		</>
	);
}
