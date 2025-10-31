'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { iCompleteMerchantProduct } from '@/store/features/admin/merchant-product';

export const ProductTabs = ({
	product,
}: {
	product: iCompleteMerchantProduct;
}) => {
	return (
		<div className="mt-16">
			<Tabs defaultValue="details">
				<TabsList className="w-full justify-start border-b">
					<TabsTrigger value="details" className="text-lg">
						Product Details
					</TabsTrigger>
					<TabsTrigger value="specs" className="text-lg">
						Specifications
					</TabsTrigger>
					<TabsTrigger value="reviews" className="text-lg">
						Reviews
					</TabsTrigger>
				</TabsList>

				<TabsContent value="details" className="mt-4">
					<div
						className="text-gray-700"
						dangerouslySetInnerHTML={{
							__html: product?.long_description || 'No details available',
						}}
					/>
				</TabsContent>

				<TabsContent value="specs" className="mt-4">
					{product?.specifications ? (
						<table className="w-full text-left">
							<tbody>
								{product?.specifications?.map(
									(spec, index) =>
										spec.specification && (
											<tr key={index} className="border-b">
												<th className="py-2 pr-4 font-semibold">
													{spec?.specification}
												</th>
												<td className="py-2">
													{spec?.specification_ans || '-'}
												</td>
											</tr>
										)
								)}
							</tbody>
						</table>
					) : (
						<p>No specifications available</p>
					)}
				</TabsContent>

				<TabsContent value="reviews" className="mt-4">
					{product?.productrating?.length > 0 ? (
						<div className="space-y-4">
							{product?.productrating?.map((review) => (
								<div key={review.id} className="flex items-center space-x-4">
									{/* Render reviews here */}
								</div>
							))}
						</div>
					) : (
						<p>No reviews yet</p>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};
