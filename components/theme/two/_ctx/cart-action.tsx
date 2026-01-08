'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
	iAddToCartRequest,
	useAddToCartMutation,
	useGetCartQuery,
} from '@/store/features/frontend/cart';
import {
	useAddToWishlistMutation,
	useDeleteFromWishlistMutation,
	useGetWishlistQuery,
} from '@/store/features/frontend/wish-list';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import { Heart, Loader2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

export function CartAction({ product }: { product: iVendorProductView }) {
	const { status } = useSession();
	const router = useRouter();
	const isAuthenticated = status === 'authenticated';

	// State for selections
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
		null
	);

	// Get unique colors and sizes from variants
	const uniqueColors = useMemo(() => {
		const colors = product?.product_variant
			?.filter((v) => v.color?.name)
			.map((v) => ({ id: v.color.id, name: v.color.name }));
		return [...new Map(colors?.map((c) => [c.id, c])).values()];
	}, [product?.product_variant]);

	const uniqueSizes = useMemo(() => {
		const sizes = product?.product_variant
			?.filter((v) => v.size?.name)
			.map((v) => ({ id: v.size.id, name: v.size.name }));
		return [...new Map(sizes?.map((s) => [s.id, s])).values()];
	}, [product?.product_variant]);

	// auto select color and size first item
	useEffect(() => {
		if (uniqueColors.length > 0) {
			handleColorSelect(uniqueColors[0].name);
		}
		if (uniqueSizes.length > 0) {
			handleSizeSelect(uniqueSizes[0].name);
		}
	}, [uniqueColors, uniqueSizes]);

	// Cart hooks
	const { data: cartData } = useGetCartQuery(undefined, {
		skip: !isAuthenticated,
	});
	const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

	// Wishlist hooks
	const { data: wishlistData } = useGetWishlistQuery(undefined, {
		skip: !isAuthenticated,
	});
	const [addToWishlist, { isLoading: isAddingToWishlist }] =
		useAddToWishlistMutation();
	const [deleteFromWishlist, { isLoading: isDeletingFromWishlist }] =
		useDeleteFromWishlistMutation();

	// Check if product is in cart or wishlist
	const isInCart = cartData?.cart?.some(
		(item) => item.product_id === product.id
	);
	const wishlistItem = wishlistData?.wishlist?.find(
		(item) => item.product_id === product.id
	);
	const isInWishlist = !!wishlistItem;

	const isWishlistLoading = isAddingToWishlist || isDeletingFromWishlist;

	// Handle quantity change
	const incrementQty = () => setQuantity((prev) => prev + 1);
	const decrementQty = () => setQuantity((prev) => Math.max(1, prev - 1));

	// Handle color selection
	const handleColorSelect = (colorName: string) => {
		setSelectedColor(colorName === selectedColor ? null : colorName);
		// Find variant with this color
		const variant = product?.product_variant?.find(
			(v) => v.color?.name === colorName
		);
		if (variant) {
			setSelectedVariantId(variant.id);
		}
	};

	// Handle size selection
	const handleSizeSelect = (sizeName: string) => {
		setSelectedSize(sizeName === selectedSize ? null : sizeName);
		// Find variant with this size (and selected color if any)
		const variant = product?.product_variant?.find(
			(v) =>
				v.size?.name === sizeName &&
				(!selectedColor || v.color?.name === selectedColor)
		);
		if (variant) {
			setSelectedVariantId(variant.id);
		}
	};

	// Handle Add to Cart
	const handleAddToCart = async () => {
		if (!isAuthenticated) {
			toast.info('Please login to add items to your cart');
			router.push('/auth?tab=login');
			return;
		}

		if (isInCart) {
			router.push('/shop/cart');
			return;
		}

		// Validate variant selection if product has variants
		if (product?.product_variant?.length > 0) {
			if (uniqueColors.length > 0 && !selectedColor) {
				toast.error('Please select a color');
				return;
			}
			if (uniqueSizes.length > 0 && !selectedSize) {
				toast.error('Please select a size');
				return;
			}
		}

		try {
			const cartData: iAddToCartRequest = {
				product_id: product.id,
				purchase_type: 'single',
				tenant_id: 'borax',
				qty: [quantity],
				size_id: [selectedSize],
				color_id: [selectedColor],
				unit_id: [product.unit_id],
				frontend_purchase: 'yes',
				cartItems: [
					{
						qty: quantity,
						color: selectedColor,
						size: selectedSize,
						variant_id: selectedVariantId,
						unit: product.unit_id,
					},
				],
			};

			const result = await addToCart(cartData).unwrap();

			if (result.status === 201) {
				toast.success(result.message || 'Added to cart');
			} else if (result.status === 409) {
				toast.info(result.message || 'Product already in cart');
			} else {
				toast.error(result.message || 'Failed to add to cart');
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	// Handle Buy Now
	const handleBuyNow = async () => {
		if (!isAuthenticated) {
			toast.info('Please login to continue');
			router.push('/auth?tab=login');
			return;
		}

		// If not in cart, add it first
		if (!isInCart) {
			await handleAddToCart();
		}

		// Navigate to checkout
		if (isInCart) {
			router.push('/shop/checkout');
		} else {
			toast.error('Product not added to cart');
		}
	};

	// Handle Wishlist Toggle
	const handleWishlistToggle = async () => {
		if (!isAuthenticated) {
			toast.info('Please login to add items to your wishlist');
			router.push('/auth?tab=login');
			return;
		}

		try {
			if (isInWishlist && wishlistItem) {
				const result = await deleteFromWishlist({
					id: wishlistItem.id,
				}).unwrap();
				if (result.success) {
					toast.success('Removed from wishlist');
				}
			} else {
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
		<div className="space-y-4">
			{/* Color Selection */}
			{uniqueColors.length > 0 && (
				<div>
					<h4 className="text-sm font-semibold mb-2">Select Color:</h4>
					<div className="flex flex-wrap items-center gap-2">
						{uniqueColors.map((c) => (
							<button
								key={c.id}
								onClick={() => handleColorSelect(c.name)}
								className={cn(
									'px-3 py-1.5 border rounded text-sm transition-all',
									selectedColor === c.name
										? 'border-orange-500 bg-orange-50 text-orange-600'
										: 'border-gray-300 hover:border-gray-400'
								)}
							>
								{c.name}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Size Selection */}
			{uniqueSizes.length > 0 && (
				<div>
					<h4 className="text-sm font-semibold mb-2">Select Size:</h4>
					<div className="flex flex-wrap items-center gap-2">
						{uniqueSizes.map((s) => (
							<button
								key={s.id}
								onClick={() => handleSizeSelect(s.name)}
								className={cn(
									'px-3 py-1.5 border rounded text-sm transition-all',
									selectedSize === s.name
										? 'border-orange-500 bg-orange-50 text-orange-600'
										: 'border-gray-300 hover:border-gray-400'
								)}
							>
								{s.name}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Quantity & Actions */}
			<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-b border-gray-200 pb-4">
				{/* Quantity Selector */}
				<div className="flex items-center border rounded">
					<button
						onClick={decrementQty}
						disabled={quantity <= 1}
						className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
					>
						<Minus className="w-4 h-4" />
					</button>
					<input
						type="number"
						min="1"
						value={quantity}
						onChange={(e) =>
							setQuantity(Math.max(1, parseInt(e.target.value) || 1))
						}
						className="w-14 text-center py-2 outline-none border-x"
					/>
					<button
						onClick={incrementQty}
						className="px-3 py-2 hover:bg-gray-100 transition-colors"
					>
						<Plus className="w-4 h-4" />
					</button>
				</div>

				{/* Add to Cart Button */}
				<Button
					onClick={handleAddToCart}
					disabled={isAddingToCart}
					className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-md hover:bg-black/90"
				>
					{isAddingToCart ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<ShoppingCart className="w-4 h-4" />
					)}
					{isInCart ? 'View Cart' : 'Add To Cart'}
				</Button>

				{/* Buy Now Button */}
				<Button
					onClick={handleBuyNow}
					disabled={isAddingToCart}
					variant="outline"
					className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md"
				>
					{isAddingToCart ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						'Buy Now'
					)}
				</Button>

				{/* Wishlist Button */}
				<Button
					onClick={handleWishlistToggle}
					disabled={isWishlistLoading}
					variant="outline"
					className={cn(
						'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md',
						isInWishlist && 'text-red-500 border-red-200 hover:bg-red-50'
					)}
				>
					{isWishlistLoading ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Heart className={cn('w-4 h-4', isInWishlist && 'fill-current')} />
					)}
				</Button>
			</div>
		</div>
	);
}
