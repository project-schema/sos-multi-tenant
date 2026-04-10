'use client';

import { Button } from '@/components/ui/button';
import { GUEST_CART_KEY, GUEST_WISHLIST_KEY } from '@/lib';
import { cn } from '@/lib/utils';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

// ─── localStorage Types ───────────────────────────────────────────────────────

export interface iGuestCartItem {
	product_id: number;
	name: string;
	price: number;
	image?: string;
	qty: number;
	color: string | null;
	size: string | null;
	variant_id: number | null;
	unit_id: number | null;
}

export interface iGuestWishlistItem {
	product_id: number;
	name: string;
	price: number;
	image?: string;
}

// ─── localStorage Helpers (export to reuse at checkout / merge on login) ──────

export const getGuestCart = (): iGuestCartItem[] => {
	if (typeof window === 'undefined') return [];
	try {
		return JSON.parse(localStorage.getItem(GUEST_CART_KEY) || '[]');
	} catch {
		return [];
	}
};

export const dispatchCartUpdate = () =>
	window.dispatchEvent(new Event('guest-cart-updated'));

export const dispatchWishlistUpdate = () =>
	window.dispatchEvent(new Event('guest-wishlist-updated'));

export const setGuestCart = (cart: iGuestCartItem[]) => {
	localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
	window.dispatchEvent(new Event('guest-cart-updated'));
};

export const setGuestWishlist = (wishlist: iGuestWishlistItem[]) => {
	localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
	window.dispatchEvent(new Event('guest-wishlist-updated'));
};

export const getGuestWishlist = (): iGuestWishlistItem[] => {
	if (typeof window === 'undefined') return [];
	try {
		return JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || '[]');
	} catch {
		return [];
	}
};

// ─── Component ────────────────────────────────────────────────────────────────

export function GuestCartAction({ product }: { product: iVendorProductView }) {
	const router = useRouter();
	const { data: session } = useSession();
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
		null,
	);

	const [isInCart, setIsInCart] = useState(false);
	const [isInWishlist, setIsInWishlist] = useState(false);

	// ── Variant helpers ────────────────────────────────────────────────────

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

	// ── Auto-select first color & size ─────────────────────────────────────

	useEffect(() => {
		if (uniqueColors.length > 0) handleColorSelect(uniqueColors[0].name);
		if (uniqueSizes.length > 0) handleSizeSelect(uniqueSizes[0].name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uniqueColors, uniqueSizes]);

	// ── Sync state from localStorage on mount ──────────────────────────────

	useEffect(() => {
		const cart = getGuestCart();
		const wishlist = getGuestWishlist();
		setIsInCart(cart.some((i) => i.product_id === product.id));
		setIsInWishlist(wishlist.some((i) => i.product_id === product.id));
	}, [product.id]);

	// ── Selection handlers ─────────────────────────────────────────────────

	const handleColorSelect = (colorName: string) => {
		setSelectedColor((prev) => (prev === colorName ? null : colorName));
		const variant = product?.product_variant?.find(
			(v) =>
				v.color?.name === colorName &&
				(!selectedSize || v.size?.name === selectedSize),
		);
		if (variant) setSelectedVariantId(variant.id);
	};

	const handleSizeSelect = (sizeName: string) => {
		setSelectedSize((prev) => (prev === sizeName ? null : sizeName));
		const variant = product?.product_variant?.find(
			(v) =>
				v.size?.name === sizeName &&
				(!selectedColor || v.color?.name === selectedColor),
		);
		if (variant) setSelectedVariantId(variant.id);
	};

	// ── Cart handler ───────────────────────────────────────────────────────

	const handleAddToCart = () => {
		if (isInCart) {
			router.push('/shop/cart');
			return;
		}

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

		const cart = getGuestCart();
		const existingIndex = cart.findIndex((i) => i.product_id === product.id);

		if (existingIndex !== -1) {
			cart[existingIndex].qty += quantity;
		} else {
			cart.push({
				product_id: product.id,
				name: product.name,
				price: Number(
					product.discount_percentage ?? product.selling_price ?? 0,
				),
				image: product.image ?? product.product_image?.[0]?.image ?? null,
				qty: quantity,
				color: selectedColor,
				size: selectedSize,
				variant_id: selectedVariantId,
				unit_id: product.unit_id ?? null,
			});
		}

		setGuestCart(cart);
		setIsInCart(true);
		toast.success('Added to cart');
	};

	// ── Buy Now handler ────────────────────────────────────────────────────

	const handleBuyNow = () => {
		if (!isInCart) handleAddToCart();
		setTimeout(() => router.push('/shop/checkout'), 100);
	};

	// ── Wishlist handler ───────────────────────────────────────────────────

	const handleWishlistToggle = () => {
		const wishlist = getGuestWishlist();

		if (isInWishlist) {
			setGuestWishlist(wishlist.filter((i) => i.product_id !== product.id));
			setIsInWishlist(false);
			toast.success('Removed from wishlist');
		} else {
			wishlist.push({
				product_id: product.id,
				name: product.name,
				price: Number(product.discount_price ?? product.selling_price ?? 0),
				image: product.image ?? product.product_image?.[0]?.image,
			});
			setGuestWishlist(wishlist);
			setIsInWishlist(true);
			toast.success('Added to wishlist');
		}
	};

	// ── Render ─────────────────────────────────────────────────────────────
	if (session) return null;

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
										? 'border-orange-500 bg-orange-500/5 text-orange-600'
										: 'border-orange-500/20 hover:bg-orange-500/5',
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
										? 'border-orange-500 bg-orange-500/5 text-orange-600'
										: 'border-orange-500/20 hover:bg-orange-500/5',
								)}
							>
								{s.name}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Quantity & Actions */}
			<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-b border-orange-500/10 pb-4">
				{/* Quantity Selector */}
				<div className="flex items-center border rounded">
					<button
						onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
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
						onClick={() => setQuantity((prev) => prev + 1)}
						className="px-3 py-2 hover:bg-gray-100 transition-colors"
					>
						<Plus className="w-4 h-4" />
					</button>
				</div>

				{/* Add to Cart Button */}
				<Button
					onClick={handleAddToCart}
					className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-500/80 text-white px-5 py-3 rounded-md"
				>
					<ShoppingCart className="w-4 h-4" />
					{isInCart ? 'View Cart' : 'Add To Cart'}
				</Button>

				{/* Buy Now Button */}
				<Button
					onClick={handleBuyNow}
					variant="outline"
					className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md hover:bg-orange-500 hover:text-white"
				>
					Buy Now
				</Button>

				{/* Wishlist Button */}
				<Button
					onClick={handleWishlistToggle}
					variant="outline"
					className={cn(
						'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md hover:bg-orange-500 hover:text-white',
						isInWishlist &&
							'bg-orange-500 text-white border-orange-500/50 hover:bg-orange-500 hover:text-white',
					)}
				>
					<Heart className={cn('w-4 h-4', isInWishlist && 'fill-current')} />
				</Button>
			</div>
		</div>
	);
}
