'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useVendorWastageProductsAllQuery } from './wastage-products-api-slice';
import { VendorWastageProductsTable } from './wastage-products-table';

export function VendorWastageProductsPage() {
	// Fetch
	const { data, isLoading, isError, isFetching } =
		useVendorWastageProductsAllQuery(undefined);

	const router = useRouter();
	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Wastage Products</CardTitle>
							<div className="flex items-center gap-2">
								<Button
									title="Create Wastage"
									onClick={() =>
										router.push('/dashboard/wastage-products/create')
									}
									size="sm"
									type="button"
									variant="outline"
								>
									Create Wastage
								</Button>
							</div>
						</div>
					</>
				}
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
