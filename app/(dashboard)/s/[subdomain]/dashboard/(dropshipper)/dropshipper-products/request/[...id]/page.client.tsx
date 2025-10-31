'use client';
import { Container1 } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import {
	DropshipperProductView,
	useSingleProductQuery,
} from '@/store/features/dropshipper/product';
import { useParams } from 'next/navigation';

export default function PageClient() {
	const params = useParams();
	const id = params.id as string[];
	// Extract product ID from catch-all route: [tenant_id, product_id, "request"]
	const productId = Array.isArray(id) ? id[1] : id;
	const tenantId = Array.isArray(id) ? id[0] : id;

	const { data, isLoading, isError } = useSingleProductQuery(
		{ tenantId: tenantId || '', productId: productId || '' },
		{ skip: !productId || !tenantId }
	);

	return (
		<>
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Details</CardTitle>}
			>
				{data?.product && <DropshipperProductView product={data.product} />}
			</Container1>
		</>
	);
}
