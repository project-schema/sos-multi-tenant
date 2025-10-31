'use client';
import { ProductImages } from '@/components/dashboard/product/product-images';
import { ProductInfo } from '@/components/dashboard/product/product-info';
import { ProductTabs } from '@/components/dashboard/product/product-tab';
import { iCompleteMerchantProduct } from '../../admin/merchant-product';
import { DropshipperProductRequestModal } from './dropshipper-product-request-modal';

export const DropshipperProductView = ({
	product,
}: {
	product: iCompleteMerchantProduct;
}) => {
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
				<div className="col-span-1">
					<ProductImages product={product} />
				</div>
				<div className="col-span-1 md:col-span-2 ">
					<ProductInfo product={product} />

					{product.tenant_id && product.id && (
						<div className="mt-6">
							<DropshipperProductRequestModal
								tenantId={product.tenant_id}
								productId={product.id.toString()}
							/>
						</div>
					)}
				</div>
			</div>
			<ProductTabs product={product} />
		</div>
	);
};
