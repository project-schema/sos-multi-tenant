'use client';
import { ProductImages } from '@/components/dashboard/product/product-images';
import { ProductTabs } from '@/components/dashboard/product/product-tab';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { sign } from '@/lib';
import { Star } from 'lucide-react';
import { iCompleteMerchantProduct } from '../../admin/merchant-product';
export const DropshipperProductRejectView = ({
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
					<div className="space-y-8">
						<div>
							<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
								{product?.name}
							</h1>
							<p className="text-gray-700 text-lg leading-relaxed">
								{product?.short_description || ''}
							</p>
							<div className="  items-center space-x-2 hidden! ">
								<div className="flex">
									{[1, 2, 3, 4, 5].map((star) => (
										<Star
											key={star}
											className="w-5 h-5 text-yellow-400"
											fill={star <= 4 ? 'currentColor' : 'none'}
										/>
									))}
								</div>
								<span className="text-sm text-gray-500">
									({product?.productrating_avg_rating || '4.5'} /{' '}
									{product?.productrating?.length || '0'} reviews)
								</span>
							</div>
						</div>

						<div className="flex items-center gap-4">
							{product?.discount_price && (
								<p className="text-2xl font-semibold">
									৳ {product?.discount_price}
								</p>
							)}
							{/* {!product?.discount_price && (
								<p className="text-lg line-through text-gray-500">
									৳ {product?.selling_price}
								</p>
							)} */}
							{product?.selling_price && (
								<p className="text-gray-500">৳ {product?.selling_price}</p>
							)}
						</div>

						{/* brand  */}
						<div className="flex items-center gap-2">
							{product?.marketplace_brand?.name && (
								<Badge variant="outline">
									{product?.marketplace_brand?.name}
								</Badge>
							)}
							{product?.marketplace_category?.name && (
								<Badge variant="outline">
									{product?.marketplace_category?.name}
								</Badge>
							)}
							{product?.marketplace_subcategory?.name && (
								<Badge variant="outline">
									{product?.marketplace_subcategory?.name}
								</Badge>
							)}
						</div>

						<div>SKU: {product?.sku}</div>

						{/* for single and both selling type */}
						{(product.selling_type === 'single' ||
							product.selling_type === 'both') && (
							<div className="mt-4 border rounded-lg  space-y-2 p-3">
								<p>Single Product Details</p>
								<div className="flex items-center gap-2">
									<h2 className="text-lg font-medium">Advance Payment</h2>
									<p>
										<Badge>
											{product?.advance_payment}{' '}
											{product.single_advance_payment_type === 'flat'
												? sign.tk
												: sign.percent}
										</Badge>
									</p>
								</div>
								<div className="flex items-center gap-2">
									<h2 className="text-lg font-medium">
										Dropshipper Commission
									</h2>
									<p>
										<Badge>
											{product?.discount_rate}{' '}
											{product.discount_type === 'flat'
												? sign.tk
												: sign.percent}
										</Badge>
									</p>
								</div>
							</div>
						)}

						{product?.selling_details &&
							product?.selling_details?.length > 0 && (
								<div className="mt-4 border rounded-lg p-1">
									<p className="capitalize">
										{product.selling_type} Product Details
									</p>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Bulk Qty </TableHead>
												<TableHead>Bulk Price </TableHead>
												<TableHead>Commission </TableHead>
												<TableHead>Advance Amount</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{product?.selling_details?.map((variant, index) => (
												<TableRow key={index}>
													<TableCell>{variant?.min_bulk_qty}</TableCell>
													<TableCell>
														{variant?.min_bulk_price} {sign.tk}
													</TableCell>
													<TableCell>
														{variant?.bulk_commission}{' '}
														{variant.bulk_commission_type === 'flat'
															? sign.tk
															: sign.percent}
													</TableCell>
													<TableCell>
														{variant?.advance_payment}{' '}
														{variant.advance_payment_type === 'flat'
															? sign.tk
															: sign.percent}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							)}
					</div>
				</div>
			</div>
			<ProductTabs product={product} />
		</div>
	);
};
