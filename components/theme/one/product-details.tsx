import { Card01 } from '@/components/web';
import Footer01 from '@/components/web/footer/01';
import Header01 from '@/components/web/header/01';
import {
	Check,
	Facebook,
	Home,
	Instagram,
	LocationEdit,
	MessageCirclePlus,
	ShoppingCart,
	Twitter,
} from 'lucide-react';
import { ProductDescription } from './_ctx/product-description';
import { ProductGallery } from './_ctx/product-gallery';

export default function ThemeOneProductDetailsPage() {
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
			<Header01 />
			<section className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Top section: Gallery + Info */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Gallery */}
					<div className="lg:col-span-4">
						<ProductGallery />
					</div>

					{/* Info */}
					<div className="lg:col-span-5 space-y-5">
						<div className="space-y-2">
							<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
								Premium 100% Cotton Panjabi – Navy Blue
							</h1>
							{/* Price */}
							<div className="flex items-end gap-3">
								<p className="text-red-500 line-through text-2xl">৳990.00</p>
								<p className="text-2xl font-semibold text-gray-900">৳990.00</p>
							</div>

							<div>
								<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-md inline-flex items-center gap-1">
									Category: Man’s Fashion
								</span>
								<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-md inline-flex items-center gap-1">
									Brand: Arong
								</span>
								<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-md inline-flex items-center gap-1">
									SKU: MOC32223
								</span>
							</div>

							<p className="inline-flex items-center gap-1 text-green-500 px-4 py-1.5 rounded-full bg-green-50 text-sm">
								24 in stock
							</p>
						</div>

						{/* Short description */}
						<p className="text-gray-700 leading-relaxed">
							Men’s Cuban Collar Shirt by ZARA — Crafted from 100% pure Chinese
							linen, this stylish half sleeve shirt offers breathable comfort
							and a relaxed fit. Available in 6 colors and sizes S to XXL.
						</p>
						<div className="flex items-center gap-3 justify-between">
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
										<button
											key={s}
											className="px-3 py-1 border rounded text-sm"
										>
											{s}
										</button>
									))}
								</div>
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
						</div>

						<div className="flex items-center gap-2">
							<h2 className="text-base font-semibold">Share:</h2>
							<div className="flex items-center gap-2">
								<Facebook className="w-6 h-6 text-gray-500" />
								<Twitter className="w-6 h-6 text-gray-500" />
								<Instagram className="w-6 h-6 text-gray-500" />
							</div>
						</div>
					</div>
					<div className="lg:col-span-3">
						<div className="border rounded-md p-3 space-y-3">
							<div className="space-y-2 border-b border-gray-200 pb-3">
								<h2 className="text-base font-semibold">Delivery Options</h2>
								<div className="text-sm space-y-2">
									<p className="flex items-center gap-2">
										<Check className="w-4 h-4" /> Cash On Delivery Available
									</p>
									<p className="flex items-center gap-2">
										<Home className="w-4 h-4" /> Home delivery all over the
										country.
									</p>
									<p className="flex items-center gap-2">
										<LocationEdit className="w-4 h-4" /> Delivery Charge Inside
										Dhaka (70Tk) 70 TK
									</p>
									<p className="flex items-center gap-2">
										<LocationEdit className="w-4 h-4" /> Delivery Charge Outside
										Dhaka (120 Tk) 120 TK
									</p>
								</div>
							</div>
							<div className="space-y-2">
								<h2 className="text-base font-semibold">
									Have any question? Call Now.
								</h2>
								<div className="text-sm space-y-2">
									<p className="flex items-center gap-2">
										<MessageCirclePlus className="w-4 h-4" /> 013464679741
									</p>
									<p className="flex items-center gap-2">
										<MessageCirclePlus className="w-4 h-4" /> 013464679741
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<ProductDescription />

				{/* Related products */}
				<div className="mt-12">
					<div className="flex items-center justify-between mb-5">
						<h2 className="text-2xl font-bold">You Might Also Like</h2>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
						{Array.from({ length: 8 }).map((_, idx) => (
							<Card01 key={idx} />
						))}
					</div>
				</div>
			</section>
			<Footer01 />
		</>
	);
}
