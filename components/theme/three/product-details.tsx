import { Footer03, Header03 } from '@/components/web';
import { getApiDataWithSubdomain, imageFormat } from '@/lib';
import {
	iVendorProduct,
	iVendorProductView,
} from '@/store/features/vendor/product/vendor-product-type';
import Link from 'next/link';
import { CartAction } from '../two/_ctx/cart-action';

export default async function ThemeThreeProductDetailsPage({
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
			imageFormat(e?.image || null)
		) ?? []),
	];

	return (
		<>
			<Header03 />
			<div className="bg-[#F6F3E9] pt-24">
				<section className="max-w-[1720px] mx-auto">
					{/* Top section: Gallery + Info */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
						{/* Gallery */}
						<div className="lg:col-span-6 grid grid-cols-12 gap-2">
							<div className="col-span-2 flex flex-col gap-3">
								{images.map((src, idx) => (
									<button
										key={idx}
										className="aspect-square rounded-md overflow-hidden bg-gray-100 border"
									>
										<img
											src={src}
											alt={`Thumb ${idx + 1}`}
											className="w-full h-full object-cover block"
										/>
									</button>
								))}
							</div>
							<div className="col-span-10 bg-gray-100 rounded-md overflow-hidden">
								<img
									src={images[0]}
									alt="Product image"
									className="w-full h-full object-cover max-h-[750px] block"
								/>
							</div>
						</div>

						{/* Info */}
						<div className="lg:col-span-6 space-y-5">
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
					</div>

					<div className="grid grid-cols-12 gap-8">
						<div className="col-span-4 px-5 py-8 border rounded-md border-primary3/20">
							<h3 className="font-kalnia fs-32 font-medium text-primary3 mb-7">
								Top Selling Product
							</h3>

							{data?.related_products &&
								data?.related_products?.length === 0 && (
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
						</div>
						<div className="col-span-8 px-5 py-8 border rounded-md border-primary3/20">
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
						</div>
					</div>
				</section>
			</div>
			<Footer03 />
		</>
	);
}
