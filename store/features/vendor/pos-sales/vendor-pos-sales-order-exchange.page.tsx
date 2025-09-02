'use client';

import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { useVendorPosSalesOrderShowQuery } from './vendor-pos-sales.api-slice';
import { VendorPOSalesSellExchange } from './vendor-pos-sell-exchange';

export function VendorPosSalesOrderExchangePage() {
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
				header={<CardTitle>Sales Exchange</CardTitle>}
			>
				{data?.status && <VendorPOSalesSellExchange data={data} />}
			</Container1>
		</>
	);
}
