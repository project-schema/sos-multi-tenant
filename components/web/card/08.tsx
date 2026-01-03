'use client';

import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';

interface ProductCard08Props {
	title?: string;
	rating?: number;
	reviewCount?: number;
	originalPrice?: string;
	currentPrice?: string;
	image?: string;
	className?: string;
}
export default function Card08({
	title = "Fanmis Men's Luxury Analog Quartz Gold Wrist Watches",
	rating = 5,
	reviewCount = 6570,
	originalPrice = '$566',
	currentPrice = '$126',
	image = 'https://i.ibb.co.com/B5tJJ2Cg/image-1.png',
	className = '',
}: ProductCard08Props) {
	// Generate star rating display
	const renderStars = () => {
		return Array.from({ length: 5 }).map((_, index) => (
			<Star key={index} className="w-3 h-3 fill-orange-400 text-orange-400" />
		));
	};

	return (
		<div
			className={`group p-2 gap-3 relative bg-white rounded-xl duration-300 overflow-hidden flex flex-col sm:flex-row ${className}`}
		>
			{/* Left Section - Image Area */}
			<div className="relative w-full sm:w-2/5 aspect-square sm:aspect-auto sm:h-auto bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
				{/* Textured background pattern */}
				<div className="absolute inset-0 opacity-30">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `repeating-linear-gradient(
							45deg,
							transparent,
							transparent 10px,
							rgba(0,0,0,0.02) 10px,
							rgba(0,0,0,0.02) 20px
						)`,
						}}
					/>
				</div>

				<Image
					src={image}
					alt={title}
					fill
					className="object-cover object-center rounded-xl relative z-10"
				/>
			</div>

			{/* Right Section - Product Details */}
			<div className="w-full sm:w-3/5   flex flex-col justify-between">
				<div className="space-y-1">
					{/* Title */}
					<h3 className="text-base font-medium text-[#27314B] line-clamp-2">
						{title}
					</h3>

					{/* Rating */}
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-0.5">{renderStars()}</div>
						<span className="text-xs text-gray-600">
							{reviewCount.toLocaleString()} Reviews
						</span>
					</div>
				</div>

				{/* Pricing and Add to Cart */}
				<div className="flex items-end justify-between pt-4 mt-auto">
					{/* Pricing */}
					<div className="flex flex-col gap-1">
						<span className="text-xs text-gray-500 line-through">
							{originalPrice}
						</span>
						<span className="text-xl font-medium text-gray-900">
							{currentPrice}
						</span>
					</div>

					{/* Add to Cart Button */}
					<button className="w-8 h-8 rounded-sm border-1 border-orange-500 bg-orange-50 hover:bg-orange-100 transition-colors duration-200 flex items-center justify-center group/btn flex-shrink-0">
						<ShoppingCart className="w-5 h-5 text-orange-500 group-hover/btn:scale-110 transition-transform duration-200" />
					</button>
				</div>
			</div>
		</div>
	);
}
