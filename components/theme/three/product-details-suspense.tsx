import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import {
	iVendorProduct,
	iVendorProductView,
} from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';
import { GuestCartAction } from '../common/guest-cart-action';
import { CartAction } from '../two/_ctx/cart-action';
import ProductSlider from './ctx/theme-gallery';

export default async function ThemeThreeProductDetailsSuspensePage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = await params;
	const data = await getApiDataWithSubdomain<{
		product: iVendorProductView;
		related_products: iVendorProduct[];
	}>(`/tenant-frontend/product/${slug}`);
	// Static mock data for UI only
	const images = [
		imageFormat(data?.product?.image || null),
		...(data?.product?.product_image?.map((e) =>
			imageFormat(e?.image || null),
		) ?? []),
	];

	return (
		<main className="bg-primary3/5 py-10 md:py-14 lg:py-16 2xl:py-24">
			<section className="max-w-[1740px] px-5 mx-auto">
				{/* Top section: Gallery + Info */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
					{/* Gallery */}
					<div className="lg:col-span-6 ">
						<MotionFadeIn>
							<ProductSlider images={images} />
						</MotionFadeIn>
					</div>

					{/* Info */}
					<MotionFadeIn className="lg:col-span-6">
						<div className="space-y-5">
							<div>
								{data?.product?.name && (
									<h1 className="text-2xl md:text-3xl font-bold text-gray-900">
										{data?.product?.name}
									</h1>
								)}
								<div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
									{/* <span className="flex items-center gap-1 text-yellow-500">
										{Array.from({ length: 5 }).map((_, i) => (
											<Star key={i} className="w-4 h-4 fill-yellow-400" />
										))}
									</span>
									<span>24 in stock</span>
									<span className="text-gray-300">|</span> */}
									{data?.product?.sku && <span>SKU: {data?.product?.sku}</span>}
								</div>
							</div>

							{/* Price */}
							<div className="flex items-end gap-3">
								<p className="text-3xl font-bold text-gray-900">
									{data?.product?.selling_price}
								</p>
								<p className="text-gray-500 line-through">
									{data?.product?.discount_price}
								</p>
							</div>

							{/* Short description */}
							{data?.product?.short_description && (
								<p className="text-gray-700 leading-relaxed">
									{data?.product?.short_description}
								</p>
							)}

							{data?.product &&
								data?.product.qty &&
								Number(data?.product.qty) > 0 && (
									<CartAction product={data?.product} />
								)}
							{data?.product &&
								data?.product.qty &&
								Number(data?.product.qty) > 0 && (
									<GuestCartAction product={data?.product} />
								)}

							{/* <div>
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
							</div> */}
						</div>
					</MotionFadeIn>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
					<MotionFadeIn className="order-2 lg:order-1 lg:col-span-4 px-5 py-8 border rounded-md border-primary3/20">
						<h3 className="font-kalnia fs-32 font-medium text-primary3 mb-7">
							Top Selling Product
						</h3>

						{data?.related_products && data?.related_products?.length === 0 && (
							<div className="space-y-4   py-2">
								<p className="text-gray-500">No related products found</p>
							</div>
						)}

						<div className="space-y-4">
							{data?.related_products?.map((e) => (
								<div key={e.id} className="flex items-center gap-6">
									<div className="max-w-[160px] w-full">
										<Link href={`/shop/${e?.slug}`} className="block">
											<img
												src={imageFormat(e?.image || null)}
												alt="product"
												width={500}
												className="block w-full h-full object-cover max-h-[130px] rounded-xl"
												height={500}
											/>
										</Link>
									</div>
									<div>
										<Link href={`/shop/${e.slug}`}>
											<h3 className="fs-20 font-montserrat font-medium text-gray-800 mb-2">
												{e?.name}
											</h3>
										</Link>
										<p className="fs-24 font-montserrat font-semibold text-gray-800 mb-2">
											{e?.discount_price}৳{' '}
											<span className="text-gray-500 line-through">
												{e?.selling_price}৳
											</span>
										</p>
									</div>
								</div>
							))}
						</div>
					</MotionFadeIn>

					<MotionFadeIn className="order-1 lg:order-2 lg:col-span-8 px-5 py-8 border rounded-md border-primary3/20">
						<h3 className="font-kalnia fs-32 font-medium text-primary3">
							Description
						</h3>
						{data?.product?.long_description && (
							<div
								dangerouslySetInnerHTML={{
									__html: data?.product?.long_description || '',
								}}
							></div>
						)}
					</MotionFadeIn>
				</div>
			</section>
		</main>
	);
}
