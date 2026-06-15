'use client';

import { Container1 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useVendorProductOrderViewQuery } from './vendor-product-order-api-slice';
import { VendorProductOrderDetailsContent } from './vendor-product-order-details-content';
import type { iVendorProductOrder } from './vendor-product-order-type';

function resolveOrderData(data: unknown): iVendorProductOrder | null {
	if (!data || typeof data !== 'object') return null;

	const response = data as Record<string, unknown>;

	if (response.message && typeof response.message === 'object') {
		return response.message as iVendorProductOrder;
	}

	if (response.order && typeof response.order === 'object') {
		return response.order as iVendorProductOrder;
	}

	if ('order_id' in response) {
		return response as iVendorProductOrder;
	}

	return null;
}

export function VendorProductOrderDetailsPage() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorProductOrderViewQuery(
		{ id: id?.toString() || '' },
		{ skip: !id }
	);

	const order = resolveOrderData(data);

	return (
		<Container1
			isError={isError || (!isLoading && !order)}
			isLoading={isLoading}
			header={
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex items-center gap-3">
						<Button variant="outline" size="icon" asChild>
							<Link href="/dashboard/product-order">
								<ArrowLeft className="size-4" />
								<span className="sr-only">Back to orders</span>
							</Link>
						</Button>
						<CardTitle>
							{order ? `Order #${order.order_id}` : 'Order Details'}
						</CardTitle>
					</div>
				</div>
			}
		>
			{order && <VendorProductOrderDetailsContent order={order} />}
		</Container1>
	);
}
