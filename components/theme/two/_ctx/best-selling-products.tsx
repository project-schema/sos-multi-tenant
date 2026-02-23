import { Card08 } from '@/components/web';
import { getApiDataWithSubdomain } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';

interface BestSellingProductsProps {
	title?: string;
	id?: string;
}

export async function BestSellingProducts({
	title,
	id,
}: BestSellingProductsProps) {
	const products = await getApiDataWithSubdomain<iVendorProduct[]>(
		`/tenant-frontend/products/${id}`,
	);
	return (
		<div className="space-y-10">
			<h2 className="text-base line-clamp-1 xl:text-2xl font-semibold border-b border-gray-200 pb-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-500 after:w-1/3">
				{title}
			</h2>
			<div className="space-y-6">
				<div className="space-y-6">
					{products?.slice(0, 4).map((product, index) => (
						<MotionFadeIn key={product.id ?? index} delay={index * 0.03}>
							<Card08 product={product} />
						</MotionFadeIn>
					))}
				</div>
			</div>
		</div>
	);
}
