'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { useVendorProductByIdQuery } from '@/store/features/vendor/product/vendor-product-api-slice';
import { VendorProductEdit } from '@/store/features/vendor/product/vendor-product-edit';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/' },
	{ name: 'Products', path: '/product' },
	{ name: 'Product Edit' },
];

export default function Page() {
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
				header={<CardTitle>Product Edit</CardTitle>}
			>
				{data?.product && <VendorProductEdit editData={data?.product} />}
			</Container1>
		</>
	);
}
