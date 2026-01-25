'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import { Star } from 'lucide-react';
import * as React from 'react';

export function ProductDescription({
	product,
}: {
	product: iVendorProductView;
}) {
	const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

	const faqs = [
		{
			question: 'What is the return policy?',
			answer:
				'You can return items within 30 days of purchase. Items must be unworn, unwashed, and with original tags attached. Please contact customer service to initiate a return.',
		},
		{
			question: 'How long does shipping take?',
			answer:
				'Standard shipping takes 5-7 business days. Express shipping (for orders over $100) takes 2-3 business days. You will receive a tracking number once your order ships.',
		},
		{
			question: 'What payment methods do you accept?',
			answer:
				'We accept all major credit cards, debit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment gateway.',
		},
		{
			question: 'Do you offer international shipping?',
			answer:
				'Yes, we ship to most countries worldwide. International shipping times vary by location (typically 10-20 business days). Additional customs fees may apply.',
		},
		{
			question: 'How do I care for this product?',
			answer:
				'Please follow the care instructions on the label. Most items can be machine washed on gentle cycle with cold water. Avoid bleach and tumble dry on low heat or air dry.',
		},
	];

	const ratings = [
		{
			id: 1,
			user: 'John Doe',
			rating: 5,
			date: '2024-01-15',
			comment:
				'Excellent quality! The fabric is soft and comfortable. Fits perfectly as described. Highly recommend!',
		},
		{
			id: 2,
			user: 'Sarah Smith',
			rating: 4,
			date: '2024-01-10',
			comment:
				'Great product overall. The color matches the photos perfectly. Only minor issue is the sizing runs slightly small.',
		},
		{
			id: 3,
			user: 'Mike Johnson',
			rating: 5,
			date: '2024-01-05',
			comment:
				'Love this product! Fast shipping and excellent customer service. Will definitely order again.',
		},
		{
			id: 4,
			user: 'Emily Brown',
			rating: 4,
			date: '2023-12-28',
			comment:
				'Good quality for the price. Material feels nice and the design is exactly as shown. Very satisfied!',
		},
	];

	const averageRating =
		ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

	return (
		<div className="mt-10">
			<Tabs defaultValue="description" className="w-full">
				<TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
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
						Reviews (1)
					</TabsTrigger>
				</TabsList>

				{/* Description Tab */}
				<TabsContent value="description" className="mt-6 space-y-8  ">
					<div
						dangerouslySetInnerHTML={{
							__html: product?.long_description || '',
						}}
					></div>

					<div>
						<h2 className="text-lg font-semibold mb-3">Size Chart (inches)</h2>
						<div className="overflow-x-auto">
							<table className="w-full text-left border">
								<thead className="bg-gray-50">
									<tr>
										<th className="p-3 border">Item</th>
										<th className="p-3 border">S</th>
										<th className="p-3 border">M</th>
										<th className="p-3 border">L</th>
										<th className="p-3 border">XL</th>
										<th className="p-3 border">XXL</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="p-3 border">Item</td>
										<td className="p-3 border">20.00</td>
										<td className="p-3 border">20.50</td>
										<td className="p-3 border">21.00</td>
										<td className="p-3 border">22.00</td>
										<td className="p-3 border">23.00</td>
									</tr>
									<tr className="bg-gray-50">
										<td className="p-3 border">Length</td>
										<td className="p-3 border">28.00</td>
										<td className="p-3 border">28.50</td>
										<td className="p-3 border">29.50</td>
										<td className="p-3 border">30.00</td>
										<td className="p-3 border">31.00</td>
									</tr>
									<tr>
										<td className="p-3 border">Sleeve Length</td>
										<td className="p-3 border">8.00</td>
										<td className="p-3 border">8.50</td>
										<td className="p-3 border">9.00</td>
										<td className="p-3 border">9.00</td>
										<td className="p-3 border">9.50</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</TabsContent>

				{/* FAQ Tab */}
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

				{/* Rating Tab */}
				<TabsContent value="rating" className="mt-6">
					<div className="space-y-6">
						{/* Rating Summary */}
						<div className="border-b border-gray-200 pb-6">
							<div className="flex items-center gap-4 mb-4">
								<div className="text-4xl font-bold">
									{averageRating.toFixed(1)}
								</div>
								<div>
									<div className="flex items-center gap-1 mb-2">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 ${
													i < Math.round(averageRating)
														? 'fill-yellow-400 text-yellow-400'
														: 'text-gray-300'
												}`}
											/>
										))}
									</div>
									<p className="text-sm text-gray-600">
										Based on {ratings.length} reviews
									</p>
								</div>
							</div>
						</div>

						{/* Individual Reviews */}
						<div className="space-y-6">
							{ratings.map((review) => (
								<div
									key={review.id}
									className="border-b border-gray-200 pb-6 last:border-0"
								>
									<div className="flex items-start justify-between mb-2">
										<div>
											<h4 className="font-semibold text-gray-900">
												{review.user}
											</h4>
											<p className="text-sm text-gray-500">{review.date}</p>
										</div>
										<div className="flex items-center gap-1">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star
													key={i}
													className={`w-4 h-4 ${
														i < review.rating
															? 'fill-yellow-400 text-yellow-400'
															: 'text-gray-300'
													}`}
												/>
											))}
										</div>
									</div>
									<p className="text-gray-700">{review.comment}</p>
								</div>
							))}
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
