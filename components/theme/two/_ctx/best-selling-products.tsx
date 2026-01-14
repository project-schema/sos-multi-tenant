import { Card08 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { iTenantFrontend } from '@/types/tenant-frontend';

interface BestSellingProductsProps {
	title?: string;
	id?: string;
}

export async function BestSellingProducts({
	title,
	id,
}: BestSellingProductsProps) {
	const settings = await getApiDataWithSubdomain<iTenantFrontend>(
		'/tenant-frontend/cms'
	);
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${id}`
	);
	return (
		<div className="space-y-10">
			<h2 className="text-base line-clamp-1 xl:text-2xl font-semibold border-b border-gray-200 pb-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-500 after:w-1/3">
				{title}
			</h2>
			<div className="space-y-6">
				{products?.map((product, index) => (
					<Card08 key={index} product={product} />
				))}
			</div>
		</div>
	);
}
