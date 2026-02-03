'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { ProductView } from '@/components/dashboard/product/product-preview';
import { CardTitle } from '@/components/ui/card';
import { useAdminGetSingleProductQuery } from '@/store/features/admin/merchant-product';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Merchant Products' },
];

export default function Page() {
	const params = useParams();
	const id = params.id as string[];
	const tenant_id = id?.[0] || '';
	const product_id = id?.[1] || '';

	const { data, isLoading, isError } = useAdminGetSingleProductQuery(
		{ id: product_id || '', tenant_id: tenant_id || '' },
		{ skip: !product_id || !tenant_id },
	);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Merchant Products</CardTitle>}
			>
				{data?.product && <ProductView product={data.product} />}
			</Container1>
		</>
	);
}
