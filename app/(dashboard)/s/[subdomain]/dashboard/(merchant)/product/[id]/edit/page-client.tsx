'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import { CardTitle } from '@/components/ui/card';
import { SessionProvider } from '@/provider';
import {
	VendorBrandCreateModal,
	VendorCategoryCreateModal,
} from '@/store/features';
import { useVendorProductByIdQuery } from '@/store/features/vendor/product/vendor-product-api-slice';
import { VendorProductEdit } from '@/store/features/vendor/product/vendor-product-edit';
import { VendorSubCategoryCreateModal } from '@/store/features/vendor/sub-category';
import { VendorSupplierCreateModal } from '@/store/features/vendor/supplier';
import { VendorWarehouseCreateModal } from '@/store/features/vendor/warehouse';
import { useParams } from 'next/navigation';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/dashboard' },
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
		<SessionProvider>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				isError={isError}
				isLoading={isLoading}
				header={
					<div className="flex items-center justify-between flex-wrap gap-2">
						<CardTitle>Product Update</CardTitle>
						<div className="flex items-center gap-2 flex-wrap">
							<VendorBrandCreateModal />
							<VendorCategoryCreateModal />
							<VendorSubCategoryCreateModal />
							<VendorSupplierCreateModal />
							<VendorWarehouseCreateModal />
						</div>
					</div>
				}
			>
				{data?.product && <VendorProductEdit editData={data?.product} />}
			</Container1>
		</SessionProvider>
	);
}
