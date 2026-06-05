'use client';

import { Container1, Loader8 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useVendorDamageProductsAllQuery } from './damage-products-api-slice';
import { VendorDamageProductsTable } from './damage-products-table';

export function VendorDamageProductsPage() {
	// Fetch
	const { data, isLoading, isError, isFetching } =
		useVendorDamageProductsAllQuery(undefined);

	const router = useRouter();
	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<>
						<div className="pb-2 lg:pb-3 flex items-center justify-between">
							<CardTitle>Damage Products</CardTitle>
							<div className="flex items-center gap-2">
								<Button
									title="Create Damage"
									onClick={() =>
										router.push('/dashboard/damage-products/create')
									}
									size="sm"
									type="button"
									variant="outline"
								>
									<Plus className="size-4" />
									Create Damage
								</Button>
							</div>
						</div>
					</>
				}
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
