'use client';

import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCard07Props {
	title?: string;
	rating?: number;
	reviewCount?: number;
	originalPrice?: string;
	currentPrice?: string;
	discount?: string;
	image?: string;
	className?: string;
}
export default function Card07({
	title = 'The Role of Personalization in Boosting Sales',
	rating = 5,
	reviewCount = 6570,
	originalPrice = '$566',
	currentPrice = '$126',
	discount = '35% OFF',
	image = 'https://i.ibb.co.com/ksb5TXDW/image.png',
	className = '',
}: ProductCard07Props) {
	// Generate star rating display
	const renderStars = () => {
		return Array.from({ length: 5 }).map((_, index) => (
			<Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
		));
	};

	return (
		<div
			className={`group relative border bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
		>
			{/* Upper Section - Image Area */}
			<div className="relative   overflow-hidden">
				<Image
					src={image}
					alt={title}
					className="object-cover object-center p-2 rounded-xl"
					width={1000}
					height={1000}
				/>

				{/* Discount Badge */}
				<div className="absolute top-3 left-3">
					<span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
						{discount}
					</span>
				</div>
			</div>

			{/* Lower Section - Text/Detail Area */}
			<div className="p-5 space-y-3">
				{/* Title */}
				<Link href={`/shop/view`}>
					<h3 className="text-base font-semibold text-gray-900 line-clamp-2">
						{title}
					</h3>
				</Link>

				{/* Rating */}
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-0.5">{renderStars()}</div>
					<span className="text-sm text-gray-600">
						{reviewCount.toLocaleString()} Reviews
					</span>
				</div>

				{/* Pricing and Add to Cart */}
				<div className="flex items-center justify-between pt-2">
					{/* Pricing */}
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-500 line-through">
							{originalPrice}
						</span>
						<span className="text-xl font-bold text-gray-900">
							{currentPrice}
						</span>
					</div>

					{/* Add to Cart Button */}
					<button className="w-12 h-12 rounded-lg border-2 border-orange-500 bg-orange-50 hover:bg-orange-100 transition-colors duration-200 flex items-center justify-center group/btn">
						<ShoppingCart className="w-5 h-5 text-orange-500 group-hover/btn:scale-110 transition-transform duration-200" />
					</button>
				</div>
			</div>
		</div>
	);
}
