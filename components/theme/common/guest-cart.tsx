'use client';

import { Button } from '@/components/ui/button';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
	getGuestCart,
	iGuestCartItem,
	setGuestCart,
} from './guest-cart-action';

export default function GuestCart() {
	const [items, setItems] = useState<iGuestCartItem[]>([]);
	const { data: session } = useSession();

	// Load from localStorage on mount
	useEffect(() => {
		setItems(getGuestCart());
	}, []);

	// ── Handlers ─────────────────────────────────────────────────────────

	const handleQtyChange = (productId: number, delta: number) => {
		const updated = items.map((item) =>
			item.product_id === productId
				? { ...item, qty: Math.max(1, item.qty + delta) }
				: item,
		);
		setItems(updated);
		setGuestCart(updated);
	};

	const handleRemove = (productId: number) => {
		const updated = items.filter((i) => i.product_id !== productId);
		setItems(updated);
		setGuestCart(updated);
		toast.success('Item removed from cart');
	};

	// ── Subtotal ──────────────────────────────────────────────────────────

	const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

	// ── Empty state ───────────────────────────────────────────────────────
	if (session) return null;
	if (items.length === 0) {
		return (
			<MotionFadeIn>
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
					<h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
					<div className="rounded-md border p-12 text-center">
						<ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h2 className="text-xl font-semibold text-gray-700 mb-2">
							Your cart is empty
						</h2>
						<p className="text-gray-500 mb-6">
							Looks like you haven&apos;t added any items to your cart yet
						</p>
						<Link href="/shop">
							<Button className="bg-orange-500 hover:bg-orange-500/80 text-white">
								Continue Shopping
							</Button>
						</Link>
					</div>
				</section>
			</MotionFadeIn>
		);
	}

	// ── Cart list ─────────────────────────────────────────────────────────

	return (
		<MotionFadeIn>
			<section className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6">
					Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Cart Table */}
					<div className="lg:col-span-8">
						{/* Header */}
						<div className="hidden md:grid grid-cols-12 text-xs font-semibold text-gray-500 px-4 py-3 border-b">
							<div className="col-span-6">Product</div>
							<div className="col-span-2 text-center">Price</div>
							<div className="col-span-2 text-center">Quantity</div>
							<div className="col-span-2 text-right">Subtotal</div>
						</div>

						{/* Rows */}
						<div className="divide-y">
							{items.map((item) => (
								<div
									key={item.product_id}
									className="grid grid-cols-12 items-center gap-4 p-4"
								>
									{/* Product info */}
									<div className="col-span-12 md:col-span-6 flex items-center gap-4">
										<button
											onClick={() => handleRemove(item.product_id)}
											className="text-gray-400 hover:text-red-500 transition-colors"
										>
											<X className="w-5 h-5" />
										</button>

										<div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-gray-100">
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

										<div>
											<p className="text-sm font-medium">{item.name}</p>
											{item.color && (
												<p className="text-xs text-gray-500">
													Color: {item.color}
												</p>
											)}
											{item.size && (
												<p className="text-xs text-gray-500">
													Size: {item.size}
												</p>
											)}
										</div>
									</div>

									{/* Unit price */}
									<div className="col-span-6 md:col-span-2 text-center">
										<span className="font-semibold">
											{item.price.toLocaleString()}৳
										</span>
									</div>

									{/* Quantity */}
									<div className="col-span-6 md:col-span-2 flex justify-center">
										<div className="inline-flex items-center border rounded">
											<button
												onClick={() => handleQtyChange(item.product_id, -1)}
												disabled={item.qty <= 1}
												className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
											>
												<Minus className="w-4 h-4" />
											</button>
											<span className="w-10 text-center select-none">
												{String(item.qty).padStart(2, '0')}
											</span>
											<button
												onClick={() => handleQtyChange(item.product_id, 1)}
												className="p-2 hover:bg-gray-100 transition-colors"
											>
												<Plus className="w-4 h-4" />
											</button>
										</div>
									</div>

									{/* Row subtotal */}
									<div className="col-span-12 md:col-span-2 text-right font-semibold">
										{(item.price * item.qty).toLocaleString()}৳
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Totals sidebar */}
					<aside className="lg:col-span-4">
						<div className="border rounded-md p-5 sticky top-4">
							<h3 className="text-lg font-bold mb-4">Cart Totals</h3>
							<div className="space-y-3 text-sm">
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Subtotal</span>
									<span className="font-semibold">
										{subtotal.toLocaleString()}৳
									</span>
								</div>
								<hr className="my-3" />
								<div className="flex items-center justify-between text-base">
									<span className="font-semibold">Total</span>
									<span className="font-bold">
										{subtotal.toLocaleString()}৳
									</span>
								</div>

								<Link href="/shop/checkout">
									<Button className="w-full mt-4 bg-orange-500 hover:bg-orange-500/80 text-white h-11">
										Proceed To Checkout
									</Button>
								</Link>

								{/* Nudge to login */}
								<p className="text-xs text-center text-gray-400 pt-1">
									Have an account?{' '}
									<Link
										href="/auth?tab=login"
										className="text-orange-500 hover:underline"
									>
										Login to sync your cart
									</Link>
								</p>
							</div>
						</div>
					</aside>
				</div>
			</section>
		</MotionFadeIn>
	);
}
