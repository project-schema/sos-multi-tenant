'use client';
import { ProductImages } from '@/components/dashboard/product/product-images';
import { ProductInfo } from '@/components/dashboard/product/product-info';
import { ProductTabs } from '@/components/dashboard/product/product-tab';

export const VendorProductView = ({ product }: { product: any }) => {
	console.log({ product });
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
				<div className="col-span-1">
					<ProductImages product={product} />
				</div>
				<div className="col-span-1 md:col-span-2">
					<ProductInfo product={product} />
				</div>
			</div>
			<ProductTabs product={product} />
		</div>
	);
};
