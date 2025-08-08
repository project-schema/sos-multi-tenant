'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	ChevronLeft,
	ChevronRight,
	Facebook,
	Heart,
	Instagram,
	Minus,
	Plus,
	Star,
	Twitter,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const sizes = ['500ml', '750ml', '1L'];
const colors = [
	{ name: 'Matte Black', value: 'black' },
	{ name: 'Pearl White', value: 'white' },
	{ name: 'Brushed Silver', value: 'silver' },
	{ name: 'Rose Gold', value: 'gold' },
];

const productVariants = Array.from({ length: 11 }, (_, i) => ({
	id: i + 1,
	color: colors[i % colors.length].name,
	image: `/placeholder.svg?height=600&width=600&text=Bottle${i + 1}`,
}));

export default function ProductPage() {
	const [selectedSize, setSelectedSize] = useState('750ml');
	const [selectedColor, setSelectedColor] = useState(colors[0].value);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFavorite, setIsFavorite] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % productVariants.length);
	};

	const previousImage = () => {
		setCurrentIndex(
			(prev) => (prev - 1 + productVariants.length) % productVariants.length
		);
	};

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	const incrementQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const decrementQuantity = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	};

	return (
		<div>
			<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
				{/* Product Image */}
				<div className="lg:w-1/2 order-1 lg:order-1 sticky top-24">
					<div className="relative aspect-square">
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white"
							onClick={previousImage}
						>
							<ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
						</Button>

						<div className="relative w-full h-full overflow-hidden rounded-2xl group">
							<Image
								src={productVariants[currentIndex].image || '/placeholder.svg'}
								alt="Premium Drink Bottle"
								fill
								className="object-cover transition-all duration-300 group-hover:scale-110"
							/>
						</div>

						<Button
							variant="ghost"
							size="icon"
							className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white"
							onClick={nextImage}
						>
							<ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
						</Button>
					</div>

					<div className="flex justify-center gap-3 sm:gap-4 mt-6">
						{productVariants.slice(0, 5).map((variant) => (
							<button
								key={variant.id}
								onClick={() =>
									setCurrentIndex(
										productVariants.findIndex((v) => v.id === variant.id)
									)
								}
								className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all
                      ${
												currentIndex ===
												productVariants.findIndex((v) => v.id === variant.id)
													? 'ring-2 ring-black'
													: 'hover:ring-1 hover:ring-gray-200'
											}
                    `}
							>
								<Image
									src={variant.image || '/placeholder.svg'}
									alt={`Premium Drink Bottle ${variant.color}`}
									fill
									className="object-cover"
								/>
							</button>
						))}
					</div>
				</div>

				{/* Product Info */}
				<div className="lg:w-1/2 space-y-8 order-2 lg:order-2">
					<div>
						<h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
							Premium Drink Bottle
						</h1>
						<div className="flex items-center space-x-2">
							<div className="flex">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star key={star} className="w-5 h-5 text-yellow-400" />
								))}
							</div>
							<span className="text-sm text-gray-500">(4.5 / 120 reviews)</span>
						</div>
					</div>

					<p className="text-2xl font-semibold">$ 49.99</p>

					<p className="text-gray-700 text-lg leading-relaxed">
						Elevate your hydration game with our Premium Drink Bottle. Crafted
						for the discerning individual who demands both style and
						functionality. This bottle keeps your beverages at the perfect
						temperature, whether you're hitting the gym or the streets. A
						must-have accessory for the fashion-forward and environmentally
						conscious.
					</p>

					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Size</h2>
						<div className="flex flex-wrap gap-3">
							{sizes.map((size) => (
								<button
									key={size}
									onClick={() => setSelectedSize(size)}
									className={`px-4 py-2 rounded-full flex items-center justify-center border-2 text-sm font-medium transition-all
                        ${
													selectedSize === size
														? 'border-black bg-black text-white'
														: 'border-gray-200 hover:border-gray-300'
												}`}
								>
									{size}
								</button>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Color</h2>
						<div className="flex flex-wrap gap-4">
							{colors.map((color) => (
								<button
									key={color.value}
									onClick={() => setSelectedColor(color.value)}
									className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center
                        ${
													selectedColor === color.value
														? 'ring-2 ring-offset-2 ring-black'
														: 'hover:ring-1 hover:ring-gray-200'
												}
                      `}
									style={{ backgroundColor: color.value }}
								>
									{selectedColor === color.value && (
										<svg
											className="w-6 h-6 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									)}
								</button>
							))}
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="flex items-center border rounded-full">
							<Button
								variant="ghost"
								size="icon"
								onClick={decrementQuantity}
								className="rounded-l-full"
							>
								<Minus className="w-4 h-4" />
							</Button>
							<span className="w-12 text-center">{quantity}</span>
							<Button
								variant="ghost"
								size="icon"
								onClick={incrementQuantity}
								className="rounded-r-full"
							>
								<Plus className="w-4 h-4" />
							</Button>
						</div>
						<Button className="flex-grow bg-black text-white hover:bg-gray-900 py-6 text-lg font-medium">
							Add to Cart
						</Button>
						<Button variant="outline" className="p-3" onClick={toggleFavorite}>
							<Heart
								className={`w-6 h-6 ${
									isFavorite ? 'fill-red-500 text-red-500' : ''
								}`}
							/>
							<span className="sr-only">Add to Favorites</span>
						</Button>
					</div>

					<div className="flex items-center space-x-4">
						<span className="text-sm font-medium">Share:</span>
						<button className="text-gray-400 hover:text-gray-500">
							<span className="sr-only">Share on Facebook</span>
							<Facebook className="w-5 h-5" />
						</button>
						<button className="text-gray-400 hover:text-gray-500">
							<span className="sr-only">Share on Twitter</span>
							<Twitter className="w-5 h-5" />
						</button>
						<button className="text-gray-400 hover:text-gray-500">
							<span className="sr-only">Share on Instagram</span>
							<Instagram className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>

			{/* Product Details Tabs */}
			<div className="mt-16">
				<Tabs defaultValue="details">
					<TabsList className="w-full justify-start border-b">
						<TabsTrigger value="details" className="text-lg">
							Product Details
						</TabsTrigger>
						<TabsTrigger value="specs" className="text-lg">
							Specifications
						</TabsTrigger>
						<TabsTrigger value="reviews" className="text-lg">
							Reviews
						</TabsTrigger>
					</TabsList>
					<TabsContent value="details" className="mt-4">
						<p className="text-gray-700">
							Our Premium Drink Bottle is designed with both style and
							functionality in mind. The double-wall vacuum insulation keeps
							your drinks cold for up to 24 hours or hot for up to 12 hours. The
							sleek, modern design fits comfortably in your hand and looks great
							on your desk or in your gym bag.
						</p>
						<ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
							<li>Made from high-quality, BPA-free stainless steel</li>
							<li>Leak-proof lid with convenient carry loop</li>
							<li>Wide mouth for easy filling and cleaning</li>
							<li>Fits most car cup holders</li>
							<li>Condensation-free exterior</li>
						</ul>
					</TabsContent>
					<TabsContent value="specs" className="mt-4">
						<table className="w-full text-left">
							<tbody>
								<tr className="border-b">
									<th className="py-2 pr-4 font-semibold">Capacity</th>
									<td className="py-2">500ml, 750ml, 1L</td>
								</tr>
								<tr className="border-b">
									<th className="py-2 pr-4 font-semibold">Material</th>
									<td className="py-2">18/8 Stainless Steel</td>
								</tr>
								<tr className="border-b">
									<th className="py-2 pr-4 font-semibold">Insulation</th>
									<td className="py-2">Double-wall vacuum</td>
								</tr>
								<tr className="border-b">
									<th className="py-2 pr-4 font-semibold">Lid Type</th>
									<td className="py-2">Screw-top with carry loop</td>
								</tr>
								<tr className="border-b">
									<th className="py-2 pr-4 font-semibold">Cold Retention</th>
									<td className="py-2">Up to 24 hours</td>
								</tr>
								<tr>
									<th className="py-2 pr-4 font-semibold">Hot Retention</th>
									<td className="py-2">Up to 12 hours</td>
								</tr>
							</tbody>
						</table>
					</TabsContent>
					<TabsContent value="reviews" className="mt-4">
						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0">
									<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
										<span className="text-xl font-semibold text-gray-600">
											JD
										</span>
									</div>
								</div>
								<div className="flex-grow">
									<h3 className="text-lg font-semibold">John Doe</h3>
									<div className="flex items-center">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star key={star} className="w-4 h-4 text-yellow-400" />
										))}
									</div>
									<p className="text-gray-600 mt-1">
										Great bottle! Keeps my drinks cold all day.
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0">
									<div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
										<span className="text-xl font-semibold text-gray-600">
											JS
										</span>
									</div>
								</div>
								<div className="flex-grow">
									<h3 className="text-lg font-semibold">Jane Smith</h3>
									<div className="flex items-center">
										{[1, 2, 3, 4].map((star) => (
											<Star key={star} className="w-4 h-4 text-yellow-400" />
										))}
										{[5].map((star) => (
											<Star key={star} className="w-4 h-4 text-gray-300" />
										))}
									</div>
									<p className="text-gray-600 mt-1">
										Stylish design, but a bit heavy when full.
									</p>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
