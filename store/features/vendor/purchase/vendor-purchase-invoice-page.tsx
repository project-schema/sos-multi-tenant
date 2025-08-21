'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useVendorPurchaseShowQuery } from './vendor-purchase-api-slice';
import { VendorPurchaseInvoice } from './vendor-purchase-invoice';

export function VendorPurchaseInvoicePage() {
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
						<CardTitle>Purchase Invoice</CardTitle>
					</div>
				</>
			}
		>
			{data?.status && <VendorPurchaseInvoice data={data} />}
		</Container1>
	);
}
