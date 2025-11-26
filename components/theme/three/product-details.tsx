import { Footer03, Header03 } from '@/components/web';
import { env } from '@/lib';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ThemeThreeProductDetailsPage() {
	// Static mock data for UI only
	const images = [
		env.placeholderImage,
		env.placeholderImage,
		env.placeholderImage,
		env.placeholderImage,
		env.placeholderImage,
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
								Men’s Cuban Collar Shirt by ZARA — Crafted from 100% pure
								Chinese linen, this stylish half sleeve shirt offers breathable
								comfort and a relaxed fit. Available in 6 colors and sizes S to
								XXL.
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
										<button
											key={s}
											className="px-3 py-1 border rounded text-sm"
										>
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
						</div>
					</div>

					<div className="grid grid-cols-12 gap-8">
						<div className="col-span-4 px-5 py-8 border rounded-md border-primary3/20">
							<h3 className="font-kalnia fs-32 font-medium text-primary3 mb-7">
								Top Selling Product
							</h3>
							<div className="space-y-4">
								{Array.from({ length: 6 }).map((_, index) => (
									<div key={index} className="flex items-center gap-6">
										<div className="max-w-[160px] w-full">
											<Image
												src={env.placeholderImage}
												alt="product"
												width={500}
												className="block w-full h-full object-cover max-h-[130px] rounded-xl"
												height={500}
											/>
										</div>
										<div>
											<Link href="/shop/product-details">
												<h3 className="fs-20 font-montserrat font-medium text-gray-800 mb-2">
													Red Pabna Cotton Monipuri Buti Saree
												</h3>
											</Link>
											<p className="fs-24 font-montserrat font-semibold text-gray-800 mb-2">
												1000৳{' '}
												<span className="text-gray-500 line-through">
													1200৳
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

							<p className="text-gray-700 leading-relaxed">
								Product details Phad Painting Durga Puja Saree Band Name :
								Horitoki Fabrics : Mixed Silk, Collection for women Styling &
								Slim Fit Color: As given picture 12 hat Saree Product Type:
								Unstitched Fabrics.. Materials: Mixed Silk. Color won t be fade.
								Aplic work on printed yoke. Stylish & Fashionable. 12 Hat &
								Bohor 43inc Traditional Look. Comfortable to wear. Disclaimer:
								Product color may slightly vary due to photographic lighting
								sources or your monitor settings. Durga Puja Saree Durga Puja is
								a festival celebrated in Bangladesh to celebrate the victory of
								Goddess Durga over evil forces. Durga Pooja is celebrated for
								the victory of goddess Durga over the demon king Mahishasura.
								The festival of Durga Puja begins on the same day as Navratri, a
								nine-night festival in many states that more broadly celebrates
								the divine feminine power.Women wear beautiful sarees for the
								ten days of celebration, the sarees have a simple design as they
								are white with red borders. On this day, women choose the saree
								as it looks very traditional, which are known as Durga Pooja
								Sarees. Being a traditional festival, it usually consists of a
								white saree with red borders. that makes the sarees even more
								special. This beautiful saree is worn by women as they have an
								ambience of tranquility that is perfect for prayer. Each day of
								Durga Pooja holds a special meaning which is why it is essential
								that your wardrobe is filled with different sarees that would
								suit the mood and theme of each day. Pay attention to the
								following sections:Saree choice for Saptami: It is best to go
								for light color sarees or cotton sarees.Saree choice for
								Ashtami: A red, white Ashtami saree is mostly preferred by women
								of all ages. Saree Choice for Navami: Sarees made using light
								material like silk or the familiar jamdani is ideal.Saree Choice
								for Vijaya Dashami: A red-white saree is preferable.
							</p>
						</div>
					</div>
				</section>
			</div>
			<Footer03 />
		</>
	);
}
