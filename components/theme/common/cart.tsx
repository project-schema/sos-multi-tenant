'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type CartItem = {
	id: number;
	title: string;
	price: number;
	compareAt?: number;
	image: string;
	qty: number;
};

const initialItems: CartItem[] = [1, 2, 3].map((i) => ({
	id: i,
	title: 'Premium 100% Cotton Panjabi – Navy Blue',
	price: 1242,
	compareAt: 1775,
	image:
		'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=800&auto=format&fit=crop',
	qty: 5,
}));

export default function CommonCart() {
	const [items, setItems] = useState<CartItem[]>(initialItems);
	const [coupon, setCoupon] = useState('');
	const [shipping, setShipping] = useState(80);
	const [discount, setDiscount] = useState(50);

	const subtotal = useMemo(
		() => items.reduce((sum, it) => sum + it.price * it.qty, 0),
		[items]
	);
	const total = subtotal - discount + shipping;

	const updateQty = (id: number, delta: number) => {
		setItems((prev) =>
			prev.map((it) =>
				it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
			)
		);
	};

	const removeItem = (id: number) => {
		setItems((prev) => prev.filter((it) => it.id !== id));
	};

	return (
		<section className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

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
						{items.map((it) => (
							<div
								key={it.id}
								className="grid grid-cols-12 items-center gap-4 p-4"
							>
								{/* product */}
								<div className="col-span-12 md:col-span-6 flex items-center gap-4">
									<button
										onClick={() => removeItem(it.id)}
										className="text-gray-400 hover:text-black"
									>
										<X className="w-5 h-5" />
									</button>
									<div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
										<Image
											src={it.image}
											alt={it.title}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<p className="text-sm font-medium">{it.title}</p>
										<div className="text-xs text-gray-400 line-through">
											{it.compareAt?.toLocaleString()}৳
										</div>
									</div>
								</div>

								{/* price */}
								<div className="col-span-6 md:col-span-2 text-center md:text-center">
									<span className="font-semibold">
										{it.price.toLocaleString()}৳
									</span>
								</div>

								{/* quantity */}
								<div className="col-span-6 md:col-span-2 flex justify-center">
									<div className="inline-flex items-center border rounded">
										<button
											className="p-2"
											onClick={() => updateQty(it.id, -1)}
										>
											<Minus className="w-4 h-4" />
										</button>
										<span className="w-10 text-center select-none">
											{it.qty.toString().padStart(2, '0')}
										</span>
										<button className="p-2" onClick={() => updateQty(it.id, 1)}>
											<Plus className="w-4 h-4" />
										</button>
									</div>
								</div>

								{/* subtotal */}
								<div className="col-span-12 md:col-span-2 text-right font-semibold">
									{(it.price * it.qty).toLocaleString()}৳
								</div>
							</div>
						))}
					</div>

					{/* Coupon */}
					<div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
						<Input
							placeholder="Coupon Code"
							value={coupon}
							onChange={(e) => setCoupon(e.target.value)}
						/>
						<Button size="lg" className="bg-black text-white w-full sm:w-auto">
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
							<div className="flex items-center justify-between">
								<span className="text-gray-600">Discount</span>
								<span className="font-semibold">{discount}৳</span>
							</div>
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
