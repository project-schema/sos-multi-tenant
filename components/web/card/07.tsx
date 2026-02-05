'use client';

import { imageFormat, sign } from '@/lib';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

export default function Card07({
	product,
	className,
}: {
	product: iVendorProduct;
	className?: string;
}) {
	// Generate star rating display
	const renderStars = () => {
		return Array.from({ length: 5 }).map((_, index) => (
			<Star key={index} className="w-3 h-3 fill-orange-400 text-orange-400" />
		));
	};

	// Calculate discount percentage
	const calculateDiscountPercentage = () => {
		if (!product?.discount_price || !product?.selling_price) return null;

		const sellingPrice = parseFloat(product.selling_price);
		const discountPrice = parseFloat(product.discount_price);

		if (sellingPrice <= 0 || discountPrice >= sellingPrice) return null;

		const discount = ((sellingPrice - discountPrice) / sellingPrice) * 100;
		return Math.round(discount);
	};

	const discountPercentage = calculateDiscountPercentage();
	const hasDiscount = product?.discount_price && discountPercentage;

	return (
		<div
			className={`group relative border bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
		>
			{/* Upper Section - Image Area */}
			<div className="relative h-56  overflow-hidden">
				<Link href={`/shop/${product?.slug}`} className="block w-full h-full">
					<img
						src={imageFormat(product?.image)}
						alt={product?.name}
						className="object-cover object-center p-2 block w-full h-full rounded-xl"
						width={1000}
						height={1000}
					/>
				</Link>

				{/* Discount Badge */}
				{hasDiscount && (
					<div className="absolute top-3 left-3 z-10">
						<span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
							-{discountPercentage}%
						</span>
					</div>
				)}
			</div>

			{/* Lower Section - Text/Detail Area */}
			<div className="p-5 space-y-1">
				{/* Title */}
				<Link className="inline-block" href={`/shop/${product?.slug}`}>
					<h3 className="text-base font-medium text-[#27314B] line-clamp-2">
						{product?.name}
					</h3>
				</Link>

				{/* Rating */}
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-0.5">{renderStars()}</div>
					<span className="text-xs text-gray-600">
						{/* {product.productrating_avg_rating?.toLocaleString() || '0'} Reviews */}
					</span>
				</div>

				{/* Pricing and Add to Cart */}
				<div className="flex items-center justify-between pt-2">
					{/* Pricing */}
					<div className="flex flex-col">
						{product?.discount_price && (
							<span className="text-sm text-gray-500 line-through">
								{product?.selling_price} {sign.tk}
							</span>
						)}

						{product?.discount_price && (
							<span className="text-xl font-medium text-gray-900">
								{product?.discount_price} {sign.tk}
							</span>
						)}

						{!product?.discount_price && (
							<span className="text-xl font-medium text-gray-900">
								{product?.selling_price} {sign.tk}
							</span>
						)}
					</div>

					{/* Add to Cart Button */}
					<Link href={`/shop/${product?.slug}`}>
						<button className="w-8 h-8 rounded-sm border-1 border-orange-500 bg-orange-50 hover:bg-orange-100 transition-colors duration-200 flex items-center justify-center group/btn">
							<ShoppingCart className="w-5 h-5 text-orange-500 group-hover/btn:scale-110 transition-transform duration-200" />
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
