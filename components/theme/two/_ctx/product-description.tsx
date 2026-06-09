'use client';

import {
	ProductReviewsSection,
	useProductReviewCount,
} from '@/components/theme/common/product-reviews';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import * as React from 'react';

export function ProductDescription({
	product,
}: {
	product: iVendorProductView;
}) {
	const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);
	const reviewCount = useProductReviewCount(product.slug);

	return (
		<div className="mt-10">
			<Tabs defaultValue="description" className="w-full">
				<TabsList className="w-full justify-start flex-wrap border-b rounded-none bg-transparent p-0 h-auto">
					<TabsTrigger
						value="description"
						className="text-base font-semibold border-0 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 rounded-none border-b border-transparent px-4 py-3"
					>
						Product Description
					</TabsTrigger>
					<TabsTrigger
						value="faq"
						className="text-base font-semibold border-0 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 rounded-none border-b border-transparent px-4 py-3"
					>
						Technical Information
					</TabsTrigger>
					<TabsTrigger
						value="rating"
						className="text-base font-semibold border-0 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 rounded-none border-b border-transparent px-4 py-3"
					>
						Reviews ({reviewCount})
					</TabsTrigger>
				</TabsList>

				<TabsContent value="description" className="mt-6 space-y-8  ">
					<div>
						<h2 className="text-lg font-semibold mb-3">Description</h2>
						<div
							className="text-gray-700"
							dangerouslySetInnerHTML={{
								__html: product?.long_description || '',
							}}
						/>
					</div>
				</TabsContent>

				<TabsContent value="faq" className="mt-6">
					<div className="space-y-4">
						{product?.specifications?.map((faq, index) => (
							<div
								key={index}
								className="border border-gray-200 rounded-lg overflow-hidden"
							>
								<button
									onClick={() =>
										setOpenFaqIndex(openFaqIndex === index ? null : index)
									}
									className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
								>
									<span className="font-semibold text-gray-900">
										{faq.specification}
									</span>
									<span className="text-gray-500 text-xl">
										{openFaqIndex === index ? '−' : '+'}
									</span>
								</button>
								{openFaqIndex === index && (
									<div className="px-4 pb-3 text-gray-700 border-t border-gray-200 bg-gray-50">
										<p className="pt-3">{faq.specification_ans}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</TabsContent>

				<TabsContent value="rating" className="mt-6">
					<ProductReviewsSection
						productId={product.id}
						productSlug={product.slug}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
