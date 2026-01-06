import { sign } from '@/lib';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import {
	Facebook,
	Heart,
	Instagram,
	MessageCirclePlus,
	ShoppingCart,
	Star,
	Twitter,
} from 'lucide-react';
import Link from 'next/link';
export function ProductInfo({ product }: { product: iVendorProductView }) {
	return (
		<>
			<div className="space-y-4">
				<h1 className="text-2xl md:text-3xl font-semibold text-[#111B37]">
					{product?.name}
				</h1>
				<div className="flex items-center gap-2">
					<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-full inline-flex items-center gap-1">
						Category: {product?.category?.name}
					</span>
					<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-full inline-flex items-center gap-1">
						Brand: {product?.brand?.name}
					</span>
					<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-full inline-flex items-center gap-1">
						SKU: {product?.sku}
					</span>
				</div>
				<div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
					<span className="flex items-center gap-1 text-yellow-500">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star key={i} className="w-4 h-4 fill-yellow-400" />
						))}
					</span>
					<span className="font-medium">6,570 Reviews</span>
				</div>

				<p className="text-sm text-green-500">In Stock</p>

				{/* Short description */}
				<p className="text-gray-700 leading-relaxed">
					{product?.short_description}
				</p>

				{/* Price */}
				<div className="flex items-center gap-3">
					<p className=" text-xl lg:text-3xl font-bold text-orange-500">
						{product?.discount_price} {sign.tk}
					</p>
					<p className="text-gray-500 line-through text-xl  ">
						{product?.selling_price} {sign.tk}
					</p>
				</div>
			</div>

			{/* Color */}
			<div>
				<h4 className="text-sm font-semibold	">Select Color:</h4>
				<div className="flex items-center gap-2">
					{product?.product_variant?.map((c) => (
						<button key={c.id} className="w-7 h-7 rounded border">
							{c.color?.name}
						</button>
					))}
				</div>
			</div>
			{/* Size */}
			<div>
				<h4 className="text-sm font-semibold mb-2">Select Size:</h4>
				<div className="flex items-center gap-2">
					{product?.product_variant?.map((s) => (
						<button key={s.id} className="px-3 py-1 border rounded text-sm">
							{s.size?.name}
						</button>
					))}
				</div>
			</div>
			{/* Quantity & Actions */}
			<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-b border-gray-200 pb-4">
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

			<div className="space-y-2">
				<h4 className="text-sm font-semibold">Have any question? Call Now.</h4>
				<p className="text-gray-700 leading-relaxed flex items-center gap-2">
					<MessageCirclePlus className="w-4 h-4" />
					<span className="text-xs">013464679741</span>
				</p>
				<p className="text-gray-700 leading-relaxed flex items-center gap-2">
					<MessageCirclePlus className="w-4 h-4" />
					<span className="text-xs">013464679741</span>
				</p>
			</div>

			<div className="flex items-center gap-2">
				<h4 className="text-sm font-semibold">Share:</h4>
				<div className="flex items-center gap-2">
					<Link
						href="https://facebook.com"
						target="_blank"
						className="w-8 h-8   rounded-full flex items-center justify-center"
					>
						<Facebook className="w-6 h-6 text-blue-500" />
					</Link>
					<Link
						href="https://twitter.com"
						target="_blank"
						className="w-8 h-8   rounded-full flex items-center justify-center"
					>
						<Twitter className="w-6 h-6 text-blue-500" />
					</Link>
					<Link
						href="https://instagram.com"
						target="_blank"
						className="w-8 h-8   rounded-full flex items-center justify-center"
					>
						<Instagram className="w-6 h-6 text-pink-500" />
					</Link>
				</div>
			</div>
		</>
	);
}
