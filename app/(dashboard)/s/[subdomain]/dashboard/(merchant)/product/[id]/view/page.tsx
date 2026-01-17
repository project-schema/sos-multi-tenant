'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import { useVendorProductByIdQuery } from '@/store/features/vendor/product/vendor-product-api-slice';
import { VendorProductView } from '@/store/features/vendor/product/vendor-product-preview';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Products', path: '/product' },
	{ name: 'Products Details' },
];

export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useVendorProductByIdQuery(
		{ id: id?.toString() || '' },
		{ skip: !id }
	);

	return (
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={<CardTitle>Products Details</CardTitle>}
			>
				{data?.product && <VendorProductView product={data.product} />}
			</Container1>
		</SessionProvider>
	);
}
