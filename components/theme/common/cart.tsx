'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { imageFormat } from '@/lib';
import {
	useDeleteFromCartMutation,
	useGetCartQuery,
} from '@/store/features/frontend/cart';
import { Loader2, Minus, Plus, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function CommonCart() {
	const { data, isLoading, isError } = useGetCartQuery();
	const [deleteFromCart, { isLoading: isDeleting }] =
		useDeleteFromCartMutation();
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const [coupon, setCoupon] = useState('');
	const [shipping] = useState(80);
	const [discount] = useState(0);

	const items = data?.cart || [];

	const subtotal = useMemo(
		() =>
			items.reduce((sum, item) => sum + Number(item.totalproductprice || 0), 0),
		[items]
	);

	const total = subtotal - discount + shipping;

	const handleRemoveItem = async (id: number) => {
		setDeletingId(id);
		try {
			const result = await deleteFromCart({ id }).unwrap();
			if (result.success) {
				toast.success(result.message || 'Item removed from cart');
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Failed to remove item');
		} finally {
			setDeletingId(null);
		}
	};

	// Loading state
	if (isLoading) {
		return (
			<section className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<div className="lg:col-span-8">
						<div className="hidden md:grid grid-cols-12 text-xs font-semibold text-gray-500 px-4 py-3 border-b">
							<div className="col-span-6">Product</div>
							<div className="col-span-2 text-center">Price</div>
							<div className="col-span-2 text-center">Quantity</div>
							<div className="col-span-2 text-right">Subtotal</div>
						</div>
						<div className="divide-y">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="grid grid-cols-12 items-center gap-4 p-4"
								>
									<div className="col-span-12 md:col-span-6 flex items-center gap-4">
										<Skeleton className="w-5 h-5" />
										<Skeleton className="w-20 h-20 rounded" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-48" />
											<Skeleton className="h-3 w-20" />
										</div>
									</div>
									<div className="col-span-6 md:col-span-2">
										<Skeleton className="h-5 w-16 mx-auto" />
									</div>
									<div className="col-span-6 md:col-span-2">
										<Skeleton className="h-10 w-24 mx-auto" />
									</div>
									<div className="col-span-12 md:col-span-2">
										<Skeleton className="h-5 w-20 ml-auto" />
									</div>
								</div>
							))}
						</div>
					</div>
					<aside className="lg:col-span-4">
						<div className="border rounded-md p-5">
							<Skeleton className="h-6 w-32 mb-4" />
							<div className="space-y-3">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-11 w-full mt-4" />
							</div>
						</div>
					</aside>
				</div>
			</section>
		);
	}

	// Error state
	if (isError) {
		return (
			<section className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
				<div className="rounded-md border p-8 text-center">
					<p className="text-red-500 mb-4">
						Failed to load cart. Please try again.
					</p>
					<Button onClick={() => window.location.reload()}>Retry</Button>
				</div>
			</section>
		);
	}

	// Empty state
	if (items.length === 0) {
		return (
			<section className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
						<Button className="bg-black text-white">Continue Shopping</Button>
					</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-3xl font-bold mb-6">
				Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
			</h1>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Cart Table */}
				<div className="lg:col-span-8">
					<div className="hidden md:grid grid-cols-12 text-xs font-semibold text-gray-500 px-4 py-3 border-b">
						<div className="col-span-6">Product</div>
						<div className="col-span-2 text-center">Price</div>
						<div className="col-span-2 text-center">Quantity</div>
						<div className="col-span-2 text-right">Subtotal</div>
					</div>

					<div className="divide-y">
						{items.map((item) => {
							const product = item.product;
							const isItemDeleting = deletingId === item.id;

							return (
								<div
									key={item.id}
									className="grid grid-cols-12 items-center gap-4 p-4"
								>
									{/* product */}
									<div className="col-span-12 md:col-span-6 flex items-center gap-4">
										<button
											onClick={() => handleRemoveItem(item.id)}
											disabled={isDeleting}
											className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
										>
											{isItemDeleting ? (
												<Loader2 className="w-5 h-5 animate-spin" />
											) : (
												<X className="w-5 h-5" />
											)}
										</button>
										<Link
											href={`/shop/${product?.slug || ''}`}
											className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0"
										>
											<img
												src={imageFormat(product?.image || null)}
												alt={product?.name || 'Product'}
												className="object-cover"
											/>
										</Link>
										<div>
											<Link
												href={`/shop/${product?.slug || ''}`}
												className="text-sm font-medium hover:text-orange-500 transition-colors"
											>
												{product?.name || 'Product'}
											</Link>
											{product?.discount_price &&
												Number(product.discount_price) <
													Number(product.selling_price) && (
													<div className="text-xs text-gray-400 line-through">
														{Number(product.selling_price).toLocaleString()}৳
													</div>
												)}
											<div className="text-xs text-gray-500 mt-1">
												Type: {item.purchase_type}
											</div>
										</div>
									</div>

									{/* price */}
									<div className="col-span-6 md:col-span-2 text-center md:text-center">
										<span className="font-semibold">
											{Number(item.product_price).toLocaleString()}৳
										</span>
									</div>

									{/* quantity */}
									<div className="col-span-6 md:col-span-2 flex justify-center">
										<div className="inline-flex items-center border rounded">
											<button className="p-2 opacity-50 cursor-not-allowed">
												<Minus className="w-4 h-4" />
											</button>
											<span className="w-10 text-center select-none">
												{String(item.product_qty).padStart(2, '0')}
											</span>
											<button className="p-2 opacity-50 cursor-not-allowed">
												<Plus className="w-4 h-4" />
											</button>
										</div>
									</div>

									{/* subtotal */}
									<div className="col-span-12 md:col-span-2 text-right font-semibold">
										{Number(item.totalproductprice).toLocaleString()}৳
									</div>
								</div>
							);
						})}
					</div>

					{/* Coupon */}
					<div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
						<Input
							placeholder="Coupon Code"
							value={coupon}
							onChange={(e) => setCoupon(e.target.value.toUpperCase())}
						/>
						<Button
							size="lg"
							className="bg-black text-white w-full sm:w-auto"
							onClick={() => toast.info('Coupon functionality coming soon!')}
						>
							Apply Coupon
						</Button>
					</div>
				</div>

				{/* Totals */}
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
							{discount > 0 && (
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Discount</span>
									<span className="font-semibold text-green-600">
										-{discount}৳
									</span>
								</div>
							)}
							<div className="flex items-start justify-between">
								<span className="text-gray-600">Shipping</span>
								<div className="text-right">
									<div className="font-semibold">{shipping}৳</div>
									<div className="text-xs text-gray-500">Shipping to Dhaka</div>
									<button className="text-xs underline mt-1">
										Change Address
									</button>
								</div>
							</div>
							<hr className="my-3" />
							<div className="flex items-center justify-between text-base">
								<span className="font-semibold">Total</span>
								<span className="font-bold">{total.toLocaleString()}৳</span>
							</div>
							<Link href="/shop/checkout">
								<Button className="w-full mt-4 bg-black text-white h-11">
									Proceed To Checkout
								</Button>
							</Link>
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
}
