'use client';
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
import { iCompleteMerchantProduct } from '@/store/features/admin/merchant-product';
import { Star } from 'lucide-react';
import { ProductVariants } from './product-variants';

export const ProductInfo = ({
	product,
}: {
	product: iCompleteMerchantProduct;
}) => {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
					{product?.name}
				</h1>
				<p className="text-gray-700 text-lg leading-relaxed">
					{product?.short_description || ''}
				</p>
				<div className="flex items-center space-x-2 hidden! ">
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
				{product?.original_price && (
					<p className="text-2xl font-semibold">৳ {product?.original_price}</p>
				)}
				{(product?.discount_price || product?.selling_price) && (
					<p className="text-lg line-through text-gray-500">
						৳
						{product?.discount_price
							? product?.discount_price
							: product?.selling_price}
					</p>
				)}
			</div>

			{/* brand  */}
			<div className="flex items-center gap-2">
				<Badge variant="outline">{(product as any)?.brand?.name}</Badge>
				<Badge variant="outline">{(product as any)?.category?.name}</Badge>{' '}
				<Badge variant="outline">{(product as any)?.subcategory?.name}</Badge>
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
						<h2 className="text-lg font-medium">Dropshipper Commission</h2>
						<p>
							<Badge>
								{product?.discount_rate}{' '}
								{product.discount_type === 'flat' ? sign.tk : sign.percent}
							</Badge>
						</p>
					</div>
				</div>
			)}

			{/* for single and both selling type */}
			{product?.product_variant && product?.product_variant?.length > 0 && (
				<div className="mt-4 border rounded-lg p-1">
					<p>Product Variants Details</p>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Unit</TableHead>
								<TableHead>Size</TableHead>
								<TableHead>Color</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Stock</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{product?.product_variant?.map((variant) => {
								return (
									<TableRow key={variant.id}>
										<TableCell>{variant?.unit?.unit_name}</TableCell>
										<TableCell>{variant?.size?.name}</TableCell>
										<TableCell>{variant?.color?.name}</TableCell>
										<TableCell>
											<Badge>
												{variant?.product?.selling_price} {sign.tk}
											</Badge>
										</TableCell>
										<TableCell>{variant?.qty}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			)}

			{product?.selling_details && product?.selling_details?.length > 0 && (
				<div className="mt-4 border rounded-lg p-1">
					<p className="capitalize">{product.selling_type} Product Details</p>
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

			<ProductVariants product={product} />
		</div>
	);
};
