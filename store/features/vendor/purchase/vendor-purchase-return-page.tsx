'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useVendorPurchaseShowQuery } from './vendor-purchase-api-slice';
import { VendorPurchaseReturn } from './vendor-purchase-return';

export function VendorPurchaseReturnPage() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorPurchaseShowQuery(
		{
			id: id?.toString() || '',
		},
		{ skip: !id }
	);

	return (
		<Container1
			isError={isError}
			isLoading={isLoading}
			header={
				<>
					<div className="pb-2 lg:pb-3 flex items-center justify-between">
						<CardTitle>Purchase Return</CardTitle>
					</div>
				</>
			}
		>
			{data?.status && <VendorPurchaseReturn data={data} />}
		</Container1>
	);
}
