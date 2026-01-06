'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type WishItem = {
	id: number;
	title: string;
	price: number;
	compareAt?: number;
	image: string;
};

const initialItems: WishItem[] = [1, 2, 3].map((i) => ({
	id: i,
	title: 'Premium 100% Cotton Panjabi – Navy Blue',
	price: 1242,
	compareAt: 1775,
	image:
		'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=800&auto=format&fit=crop',
}));
export default function CommonWishList() {
	const [items, setItems] = useState<WishItem[]>(initialItems);

	const removeItem = (id: number) =>
		setItems((prev) => prev.filter((it) => it.id !== id));
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
			<h1 className="text-3xl font-bold mb-6">Wishlist</h1>

			<div className="rounded-md overflow-hidden border">
				{/* Header row (md+) */}
				<div className="hidden md:grid grid-cols-12 bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-3 border-b">
					<div className="col-span-7">Product</div>
					<div className="col-span-3">Price</div>
					<div className="col-span-2 text-right">Actions</div>
				</div>

				{/* Rows */}
				<div className="divide-y">
					{items.map((it) => (
						<div
							key={it.id}
							className="grid grid-cols-12 items-center gap-4 p-4"
						>
							{/* Product */}
							<div className="col-span-12 md:col-span-7 flex items-center gap-4">
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
								<p className="text-sm font-medium">{it.title}</p>
							</div>

							{/* Price */}
							<div className="col-span-6 md:col-span-3">
								<div className="text-xs text-gray-400 line-through">
									{it.compareAt?.toLocaleString()}৳
								</div>
								<div className="text-base font-semibold">
									{it.price.toLocaleString()}৳
								</div>
							</div>

							{/* Actions */}
							<div className="col-span-6 md:col-span-2 flex md:justify-end">
								<Button className="bg-black text-white w-full md:w-auto">
									<ShoppingCart className="w-4 h-4" /> Add To Cart
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
