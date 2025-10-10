'use client';

import { Eye, Heart, Share2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
	id: number;
	title: string;
	subtitle?: string;
	price: string;
	originalPrice?: string;
	discount?: string;
	image: string;
	rating: number;
	reviewCount: number;
	badge?: string;
	isNew?: boolean;
	isOnSale?: boolean;
	colors?: string[];
	sizes?: string[];
	href?: string;
}

const defaultProduct: ProductCardProps = {
	id: 1,
	title: 'Premium Koti Collection',
	subtitle: 'Traditional Waistcoat',
	price: '৳2,499',
	originalPrice: '৳3,999',
	discount: '37% OFF',
	image:
		'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
	rating: 4.8,
	reviewCount: 124,
	badge: 'Best Seller',
	isNew: false,
	isOnSale: true,
	colors: ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'],
	sizes: ['S', 'M', 'L', 'XL'],
	href: '/product/koti-collection',
};

export default function Card01({
	product = defaultProduct,
	showQuickActions = true,
	showColors = true,
	showSizes = true,
	className = '',
}: {
	product?: ProductCardProps;
	showQuickActions?: boolean;
	showColors?: boolean;
	showSizes?: boolean;
	className?: string;
}) {
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
	const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
	const [isHovered, setIsHovered] = useState(false);

	const handleWishlist = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsWishlisted(!isWishlisted);
	};

	const handleQuickView = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		// Handle quick view functionality
		console.log('Quick view:', product.id);
	};

	const handleShare = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		// Handle share functionality
		console.log('Share:', product.id);
	};

	return (
		<div
			className={`group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Image Container */}
			<div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
				{/* Product Image */}
				<img
					src={product.image}
					alt={product.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
					loading="lazy"
				/>

				{/* Badges */}
				<div className="absolute top-3 left-3 flex flex-col gap-2">
					{product.badge && (
						<span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
							{product.badge}
						</span>
					)}
					{product.isNew && (
						<span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
							NEW
						</span>
					)}
					{product.isOnSale && (
						<span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
							SALE
						</span>
					)}
				</div>

				{/* Quick Actions */}
				{showQuickActions && (
					<div
						className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
							isHovered
								? 'opacity-100 translate-x-0'
								: 'opacity-0 translate-x-4'
						}`}
					>
						<button
							onClick={handleWishlist}
							className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
								isWishlisted
									? 'bg-red-500 text-white'
									: 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
							}`}
						>
							<Heart
								className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
							/>
						</button>
						<button
							onClick={handleQuickView}
							className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-all duration-200"
						>
							<Eye className="w-4 h-4" />
						</button>
						<button
							onClick={handleShare}
							className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-green-50 hover:text-green-500 transition-all duration-200"
						>
							<Share2 className="w-4 h-4" />
						</button>
					</div>
				)}

				{/* Discount Badge */}
				{product.discount && (
					<div className="absolute bottom-3 left-3">
						<span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
							{product.discount}
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="p-4 space-y-3">
				{/* Title & Subtitle */}
				<div>
					<Link
						href={product.href || `/product/${product.id}`}
						className="block group-hover:text-blue-600 transition-colors duration-200"
					>
						<h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
							{product.title}
						</h3>
					</Link>
				</div>

				{/* Price */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<span className="text-lg font-bold text-gray-900">
							{product.price}
						</span>
						{product.originalPrice && (
							<span className="text-sm text-gray-500 line-through">
								{product.originalPrice}
							</span>
						)}
					</div>
				</div>

				{/* Add to Cart Button */}
				<button className="w-full bg-black text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2 group/btn">
					<ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
					<span>Add to Cart</span>
				</button>
			</div>
		</div>
	);
}
