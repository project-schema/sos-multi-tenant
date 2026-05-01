'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import { useSingleProductQuery } from '@/store/features/dropshipper/product';
import { DropshipperProductRejectView } from '@/store/features/dropshipper/product/dropshipper-product-reject-view';
import { useParams } from 'next/navigation';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Products', path: '/dropshipper-products' },
	{ name: 'Details' },
];
export default function PageClient() {
	const params = useParams();
	const id = params.id as string[];
	// Extract product ID from catch-all route: [tenant_id, product_id, "request"]
	const productId = Array.isArray(id) ? id[1] : id;
	const tenantId = Array.isArray(id) ? id[0] : id;

	const { data, isLoading, isError } = useSingleProductQuery(
		{ tenantId: tenantId || '', productId: productId || '' },
		{ skip: !productId || !tenantId },
	);

	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />

			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Details</CardTitle>}
			>
				{data?.product && (
					<DropshipperProductRejectView product={data.product} />
				)}
			</Container1>
		</SessionProvider>
	);
}
