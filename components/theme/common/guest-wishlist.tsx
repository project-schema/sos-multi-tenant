'use client';

import { Button } from '@/components/ui/button';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
	getGuestCart,
	getGuestWishlist,
	setGuestCart,
	setGuestWishlist,
	type iGuestWishlistItem,
} from './guest-cart-action'; // adjust path as needed

export default function GuestWishList() {
	const { data: session } = useSession();
	const [items, setItems] = useState<iGuestWishlistItem[]>([]);

	useEffect(() => {
		setItems(getGuestWishlist());
	}, []);

	// ── Remove from wishlist ──────────────────────────────────────────────

	const handleRemove = (productId: number) => {
		const updated = items.filter((i) => i.product_id !== productId);
		setItems(updated);
		setGuestWishlist(updated);
		toast.success('Removed from wishlist');
	};

	// ── Move to cart ──────────────────────────────────────────────────────

	const handleMoveToCart = (item: iGuestWishlistItem) => {
		const cart = getGuestCart();
		const exists = cart.findIndex((c) => c.product_id === item.product_id);

		if (exists !== -1) {
			toast.info('Already in cart');
		} else {
			cart.push({
				product_id: item.product_id,
				name: item.name,
				price: item.price,
				image: item.image,
				qty: 1,
				color: null,
				size: null,
				variant_id: null,
				unit_id: null,
			});
			setGuestCart(cart);
			toast.success('Added to cart');
		}

		// Remove from wishlist after moving
		handleRemove(item.product_id);
	};

	if (session) {
		return null;
	}

	// ── Empty state ───────────────────────────────────────────────────────

	if (items.length === 0) {
		return (
			<MotionFadeIn>
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
					<h1 className="text-3xl font-bold mb-6">Wishlist</h1>
					<div className="rounded-md border p-12 text-center">
						<Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Your wishlist is empty
						</h2>
						<p className="text-gray-500 mb-6">
							Start adding items you love to your wishlist
						</p>
						<Link href="/shop">
							<Button className="bg-orange-500 hover:bg-orange-500/80 text-white">
								Browse Products
							</Button>
						</Link>
					</div>
				</section>
			</MotionFadeIn>
		);
	}

	// ── List ──────────────────────────────────────────────────────────────

	return (
		<MotionFadeIn>
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6">
					Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
				</h1>

				<div className="rounded-md overflow-hidden border">
					{/* Header (md+) */}
					<div className="hidden md:grid grid-cols-12 bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-3 border-b">
						<div className="col-span-7">Product</div>
						<div className="col-span-3">Price</div>
						<div className="col-span-2 text-right">Actions</div>
					</div>

					{/* Rows */}
					<div className="divide-y">
						{items.map((item) => (
							<div
								key={item.product_id}
								className="grid grid-cols-12 items-center gap-4 p-4"
							>
								{/* Product */}
								<div className="col-span-12 md:col-span-7 flex items-center gap-4">
									<button
										onClick={() => handleRemove(item.product_id)}
										className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
									>
										<X className="w-5 h-5" />
									</button>

									<div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-gray-100">
										{item.image ? (
											<img
												src={item.image}
												alt={item.name}
												className="object-cover w-full h-full"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center text-gray-300">
												<ShoppingCart className="w-8 h-8" />
											</div>
										)}
									</div>

									<span className="text-sm font-medium">{item.name}</span>
								</div>

								{/* Price */}
								<div className="col-span-6 md:col-span-3">
									<div className="text-base font-semibold">
										{item.price.toLocaleString()}৳
									</div>
								</div>

								{/* Actions */}
								<div className="col-span-6 md:col-span-2 flex md:justify-end">
									<Button
										onClick={() => handleMoveToCart(item)}
										className="w-full md:w-auto bg-orange-500 hover:bg-orange-500/80 text-white text-sm"
									>
										Add to Cart
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Login nudge */}
				<p className="text-xs text-center text-gray-400 mt-6">
					Want to save your wishlist permanently?{' '}
					<Link
						href="/auth?tab=login"
						className="text-orange-500 hover:underline"
					>
						Login to your account
					</Link>
				</p>
			</section>
		</MotionFadeIn>
	);
}
