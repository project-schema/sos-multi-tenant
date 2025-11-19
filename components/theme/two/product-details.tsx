import { Card07 } from '@/components/web';
import Footer02 from '@/components/web/footer/02';
import Header02 from '@/components/web/header/02';
import { Heart, Phone, Shield, ShoppingCart, Star, Truck } from 'lucide-react';

export default function ThemeTwoProductDetailsPage() {
	// Static mock data for UI only
	const images = [
		'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=2069&auto=format&fit=crop',
		'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2069&auto=format&fit=crop',
	];

	return (
		<>
			<Header02 />
			<section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Top section: Gallery + Info */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Gallery */}
					<div className="lg:col-span-6">
						<div className="aspect-[4/5] bg-gray-100 rounded-md overflow-hidden">
							<img
								src={images[0]}
								alt="Product image"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="mt-3 grid grid-cols-5 gap-3">
							{images.map((src, idx) => (
								<button
									key={src}
									className="aspect-square rounded-md overflow-hidden bg-gray-100 border"
								>
									<img
										src={src}
										alt={`Thumb ${idx + 1}`}
										className="w-full h-full object-cover"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Info */}
					<div className="lg:col-span-6 space-y-5">
						<div>
							<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
								Premium 100% Cotton Panjabi – Navy Blue
							</h1>
							<div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
								<span className="flex items-center gap-1 text-yellow-500">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star key={i} className="w-4 h-4 fill-yellow-400" />
									))}
								</span>
								<span>24 in stock</span>
								<span className="text-gray-300">|</span>
								<span>SKU: MOC32223</span>
							</div>
						</div>

						{/* Price */}
						<div className="flex items-end gap-3">
							<p className="text-3xl font-bold text-gray-900">৳990.00</p>
							<p className="text-gray-500 line-through">৳990.00</p>
						</div>

						{/* Short description */}
						<p className="text-gray-700 leading-relaxed">
							Men’s Cuban Collar Shirt by ZARA — Crafted from 100% pure Chinese
							linen, this stylish half sleeve shirt offers breathable comfort
							and a relaxed fit. Available in 6 colors and sizes S to XXL.
						</p>

						{/* Color */}
						<div>
							<h4 className="text-sm font-semibold mb-2">Select Color:</h4>
							<div className="flex items-center gap-2">
								{['#ef4444', '#22c55e', '#3b82f6', '#8b5cf6', '#fde047'].map(
									(c) => (
										<button
											key={c}
											className="w-7 h-7 rounded border"
											style={{ background: c }}
											aria-label={c}
										/>
									)
								)}
							</div>
						</div>

						{/* Size */}
						<div>
							<h4 className="text-sm font-semibold mb-2">Select Size:</h4>
							<div className="flex items-center gap-2">
								{['S', 'M', 'L', 'XL'].map((s) => (
									<button key={s} className="px-3 py-1 border rounded text-sm">
										{s}
									</button>
								))}
							</div>
						</div>

						{/* Quantity & Actions */}
						<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
							<div className="flex items-center border rounded">
								<button className="px-3 py-2">-</button>
								<input
									className="w-12 text-center py-2 outline-none"
									defaultValue={1}
								/>
								<button className="px-3 py-2">+</button>
							</div>
							<button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-md">
								<ShoppingCart className="w-4 h-4" />
								Add To Cart
							</button>
							<button className="inline-flex items-center justify-center gap-2 border px-5 py-3 rounded-md">
								Buy Now
							</button>
							<button className="inline-flex items-center justify-center gap-2 border px-4 py-3 rounded-md">
								<Heart className="w-4 h-4" />
							</button>
						</div>

						{/* Delivery options */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-700">
							<div className="flex items-start gap-3 border rounded-md p-3">
								<Truck className="w-5 h-5 mt-0.5" />
								<p>
									Cash on delivery available, Dhaka and all over the country.
								</p>
							</div>
							<div className="flex items-start gap-3 border rounded-md p-3">
								<Shield className="w-5 h-5 mt-0.5" />
								<p>Delivery inside Dhaka: ৳70, outside Dhaka: ৳120–৳130</p>
							</div>
							<div className="flex items-start gap-3 border rounded-md p-3">
								<Phone className="w-5 h-5 mt-0.5" />
								<p>Have any question? Call now: 01346679471, 01346679471</p>
							</div>
						</div>
					</div>
				</div>

				{/* Tabs-like content */}
				<div className="mt-10 space-y-8">
					<div>
						<h2 className="text-lg font-semibold mb-3">Description</h2>
						<p className="text-gray-700">
							The model is wearing a white blouse from our stylist's collection.
							Fabric is artificial silk manufactured by synthetic fibres like
							rayon. It's light in weight and soft on the skin for comfort in
							summers.
						</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-3">Material & Care</h2>
						<ul className="list-disc pl-5 text-gray-700 space-y-1">
							<li>Top fabric: pure cotton</li>
							<li>Bottom fabric: pure cotton</li>
							<li>Hand-wash</li>
						</ul>
					</div>

					<div>
						<h2 className="text-lg font-semibold mb-3">Size Chart (inches)</h2>
						<div className="overflow-x-auto">
							<table className="w-full text-left border">
								<thead className="bg-gray-50">
									<tr>
										<th className="p-3 border">Item</th>
										<th className="p-3 border">S</th>
										<th className="p-3 border">M</th>
										<th className="p-3 border">L</th>
										<th className="p-3 border">XL</th>
										<th className="p-3 border">XXL</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="p-3 border">Item</td>
										<td className="p-3 border">20.00</td>
										<td className="p-3 border">20.50</td>
										<td className="p-3 border">21.00</td>
										<td className="p-3 border">22.00</td>
										<td className="p-3 border">23.00</td>
									</tr>
									<tr className="bg-gray-50">
										<td className="p-3 border">Length</td>
										<td className="p-3 border">28.00</td>
										<td className="p-3 border">28.50</td>
										<td className="p-3 border">29.50</td>
										<td className="p-3 border">30.00</td>
										<td className="p-3 border">31.00</td>
									</tr>
									<tr>
										<td className="p-3 border">Sleeve Length</td>
										<td className="p-3 border">8.00</td>
										<td className="p-3 border">8.50</td>
										<td className="p-3 border">9.00</td>
										<td className="p-3 border">9.00</td>
										<td className="p-3 border">9.50</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Related products */}
				<div className="mt-12">
					<div className="flex items-center justify-between mb-5">
						<h2 className="text-2xl font-bold">You Might Also Like</h2>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
						{Array.from({ length: 8 }).map((_, idx) => (
							<Card07 key={idx} />
						))}
					</div>
				</div>
			</section>
			<Footer02 />
		</>
	);
}
