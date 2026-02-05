import { sign } from '@/lib';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import {
	Facebook,
	Instagram,
	MessageCirclePlus,
	Star,
	Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { CartAction } from './cart-action';
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

				{Number(product.qty) > 0 && (
					<p className="text-sm text-green-500">In Stock</p>
				)}
				{Number(product.qty) <= 0 && (
					<p className="text-sm text-red-500">Out of Stock</p>
				)}

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

			{/* Color & Size & Quantity & Actions */}
			{Number(product.qty) > 0 && <CartAction product={product} />}

			<div className="space-y-2  !hidden">
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

			<div className="flex items-center gap-2  !hidden">
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
