'use client';

import { ProductReviewsSection } from '@/components/theme/common/product-reviews';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';

export function ThemeThreeProductDescription({
	product,
}: {
	product: iVendorProductView;
}) {
	return (
		<div className="space-y-8">
			<div>
				<h3 className="font-kalnia fs-32 font-medium text-primary3 mb-4">
					Description
				</h3>
				{product?.long_description ? (
					<div
						dangerouslySetInnerHTML={{
							__html: product.long_description,
						}}
					/>
				) : (
					<p className="text-gray-500">No description available.</p>
				)}
			</div>

			{product?.specifications && product.specifications.length > 0 && (
				<div>
					<h3 className="font-kalnia fs-32 font-medium text-primary3 mb-4">
						Technical Information
					</h3>
					<div className="space-y-3">
						{product.specifications.map((spec, index) => (
							<div
								key={index}
								className="rounded-md border border-primary3/20 px-4 py-3"
							>
								<p className="font-medium text-gray-900">{spec.specification}</p>
								<p className="mt-1 text-sm text-gray-600">
									{spec.specification_ans}
								</p>
							</div>
						))}
					</div>
				</div>
			)}

			<div>
				<h3 className="font-kalnia fs-32 font-medium text-primary3 mb-4">
					Reviews
				</h3>
				<ProductReviewsSection
					productId={product.id}
					productSlug={product.slug}
				/>
			</div>
		</div>
	);
}
