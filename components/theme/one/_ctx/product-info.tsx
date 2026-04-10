import { CartAction } from '@/components/theme/two/_ctx/cart-action';
import { sign } from '@/lib';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { GuestCartAction } from '../../common/guest-cart-action';

export function ProductInfo({ product }: { product?: iVendorProductView }) {
	return (
		<>
			<div className="space-y-2">
				<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
					{product?.name}
				</h1>
				{/* if discount price is available, show the discount price else show the selling price */}
				<div className="flex items-end gap-3">
					{product?.discount_price && (
						<p className="text-red-500 line-through text-2xl">
							{product?.selling_price}
							{sign.tk}
						</p>
					)}
					<p className="text-2xl font-semibold text-gray-900">
						{product?.discount_price || product?.selling_price} {sign.tk}
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

				{Number(product?.qty) > 0 && (
					<p className="text-sm text-green-500">In Stock</p>
				)}
				{Number(product?.qty) <= 0 && (
					<p className="text-sm text-red-500">Out of Stock</p>
				)}
			</div>

			{/* Short description */}
			<p className="text-gray-700 leading-relaxed">
				{product?.short_description}
			</p>
			{product && Number(product?.qty) > 0 && <CartAction product={product} />}
			{product && Number(product?.qty) > 0 && (
				<GuestCartAction product={product} />
			)}

			<div className="items-center gap-2 hidden">
				<h2 className="text-base font-semibold">Share:</h2>
				<div className="flex items-center gap-2">
					<Facebook className="w-6 h-6 text-gray-500" />
					<Twitter className="w-6 h-6 text-gray-500" />
					<Instagram className="w-6 h-6 text-gray-500" />
				</div>
			</div>
		</>
	);
}
