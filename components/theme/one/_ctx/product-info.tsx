import { CartAction } from '@/components/theme/two/_ctx/cart-action';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function ProductInfo({ product }: { product?: iVendorProductView }) {
	return (
		<div className="lg:col-span-5 space-y-5">
			<div className="space-y-2">
				<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
					{product?.name}
				</h1>
				{/* Price */}
				<div className="flex items-end gap-3">
					<p className="text-red-500 line-through text-2xl">
						{product?.original_price}
					</p>
					<p className="text-2xl font-semibold text-gray-900">
						{product?.selling_price}
					</p>
				</div>

				<div>
					<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-md inline-flex items-center gap-1">
						Category: {product?.category?.name}
					</span>
					<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-md inline-flex items-center gap-1">
						Brand: {product?.brand?.name}
					</span>
					<span className="text-xs text-black bg-gray-100 px-3 py-1.5 rounded-md inline-flex items-center gap-1">
						SKU: {product?.sku}
					</span>
				</div>

				<p className="inline-flex items-center gap-1 text-green-500 px-4 py-1.5 rounded-full bg-green-50 text-sm">
					{product?.qty} in stock
				</p>
			</div>

			{/* Short description */}
			<p className="text-gray-700 leading-relaxed">
				{product?.short_description}
			</p>
			{product && <CartAction product={product} />}

			<div className="flex items-center gap-2">
				<h2 className="text-base font-semibold">Share:</h2>
				<div className="flex items-center gap-2">
					<Facebook className="w-6 h-6 text-gray-500" />
					<Twitter className="w-6 h-6 text-gray-500" />
					<Instagram className="w-6 h-6 text-gray-500" />
				</div>
			</div>
		</div>
	);
}
