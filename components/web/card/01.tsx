'use client';

import { imageFormat, sign } from '@/lib';
import {
	useAddToWishlistMutation,
	useDeleteFromWishlistMutation,
	useGetWishlistQuery,
} from '@/store/features/frontend/wish-list';
import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { Eye, Heart, Loader2, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Card01({ product }: { product?: iVendorProduct }) {
	const { status } = useSession();
	const router = useRouter();
	const isAuthenticated = status === 'authenticated';
	const [isHovered, setIsHovered] = useState(false);

	// Wishlist hooks
	const { data: wishlistData } = useGetWishlistQuery(undefined, {
		skip: !isAuthenticated,
	});
	const [addToWishlist, { isLoading: isAddingToWishlist }] =
		useAddToWishlistMutation();
	const [deleteFromWishlist, { isLoading: isDeletingFromWishlist }] =
		useDeleteFromWishlistMutation();

	// Check if product is in wishlist
	const wishlistItem = wishlistData?.wishlist?.find(
		(item) => item.product_id === product?.id
	);
	const isWishlisted = !!wishlistItem;
	const isWishlistLoading = isAddingToWishlist || isDeletingFromWishlist;

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

	const handleWishlist = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (!isAuthenticated) {
			toast.info('Please login to add items to your wishlist');
			router.push('/auth?tab=login');
			return;
		}

		try {
			if (isWishlisted && wishlistItem) {
				const result = await deleteFromWishlist({
					id: wishlistItem.id,
				}).unwrap();
				if (result.success) {
					toast.success('Removed from wishlist');
				}
			} else if (product?.id) {
				const result = await addToWishlist({
					product_id: product.id,
				}).unwrap();
				if (result.success) {
					toast.success('Added to wishlist');
				}
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	return (
		<div
			className={`group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Image Container */}
			<div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
				{/* Product Image */}
				<Link href={`/shop/${product?.slug}`}>
					<img
						src={imageFormat(product?.image ?? null)}
						alt={product?.name}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						loading="lazy"
					/>
				</Link>

				{/* Badges */}
				<div className="absolute top-3 left-3 flex flex-col gap-2">
					{/* {product?.badge && (
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
					)} */}
				</div>

				{/* Quick Actions */}
				{isHovered && (
					<div
						className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
							isHovered
								? 'opacity-100 translate-x-0'
								: 'opacity-0 translate-x-4'
						}`}
					>
						<button
							onClick={handleWishlist}
							disabled={isWishlistLoading}
							className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 ${
								isWishlisted
									? 'bg-red-500 text-white'
									: 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
							}`}
						>
							{isWishlistLoading ? (
								<Loader2 className="w-4 h-4 animate-spin" />
							) : (
								<Heart
									className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
								/>
							)}
						</button>
						<Link
							href={`/shop/${product?.slug}`}
							className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-all duration-200"
						>
							<Eye className="w-4 h-4" />
						</Link>
					</div>
				)}

				{/* Discount Badge */}
				{hasDiscount && (
					<div className="absolute bottom-3 left-3 z-10">
						<span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
							-{discountPercentage}%
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className="p-4 space-y-3">
				{/* Title & Subtitle */}
				<div>
					<Link
						href={`/shop/${product?.slug}`}
						className="block group-hover:text-blue-600 transition-colors duration-200"
					>
						<h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
							{product?.name}
						</h3>
					</Link>
				</div>

				{/* Price */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						{product?.discount_price ? (
							<>
								<span className="text-lg font-bold text-gray-900">
									{product?.discount_price} {sign.tk}
								</span>
								<span className="text-sm text-gray-500 line-through">
									{product?.selling_price} {sign.tk}
								</span>
							</>
						) : (
							<span className="text-lg font-bold text-gray-900">
								{product?.selling_price} {sign.tk}
							</span>
						)}
					</div>
				</div>

				{/* Add to Cart Button */}
				<Link
					href={`/shop/${product?.slug}`}
					className="w-full bg-black text-white py-2 px-4 rounded-md font-medium  transition-colors duration-200 flex items-center justify-center space-x-2 group/btn"
				>
					<ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
					<span className="hidden md:block">Order Now</span>
				</Link>
			</div>
		</div>
	);
}
