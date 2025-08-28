'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useVendorPosSalesOrderShowQuery } from './vendor-pos-sales.api-slice';
import { VendorPOSalesSellReturn } from './vendor-pos-sell-return';

export function VendorPosSalesOrderReturnPage() {
	const { id } = useParams();
	// Fetch
	const { data, isLoading, isError } = useVendorPosSalesOrderShowQuery(
		{
			id: id?.toString() || '',
		},
		{
			skip: !id,
		}
	);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Sales Invoice</CardTitle>}
			>
				{data?.status && <VendorPOSalesSellReturn data={data} />}
			</Container1>
		</>
	);
}
