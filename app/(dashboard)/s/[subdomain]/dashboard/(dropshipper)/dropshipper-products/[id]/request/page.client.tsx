'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useVendorProductByIdQuery } from '@/store/features/vendor/product/vendor-product-api-slice';
import { VendorProductView } from '@/store/features/vendor/product/vendor-product-preview';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Products', path: '/dropshipper-products' },
	{ name: 'Details' },
];

export default function PageClient() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorProductByIdQuery(
		{ id: id?.toString() || '' },
		{ skip: !id }
	);

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Details</CardTitle>}
			>
				{data?.product && <VendorProductView product={data.product} />}
			</Container1>
		</>
	);
}
