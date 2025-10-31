'use client';
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
				<div className="flex items-center space-x-2">
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
				<p className="text-2xl font-semibold">৳ {product?.selling_price}</p>
				{product?.discount_price && (
					<p className="text-lg line-through text-gray-500">
						৳ {product?.original_price}
					</p>
				)}
			</div>

			<p className="text-gray-700 text-lg leading-relaxed">
				{product?.short_description || 'No description available'}
			</p>

			<ProductVariants product={product} />
		</div>
	);
};
