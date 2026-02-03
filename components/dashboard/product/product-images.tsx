'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { env } from '@/lib';
import { iCompleteMerchantProduct } from '@/store/features/admin/merchant-product';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const ProductImages = ({
	product,
}: {
	product: iCompleteMerchantProduct;
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFading, setIsFading] = useState(false);
	const mainImage = product?.image
		? `${env.baseAPI}/${product?.image}`
		: '/placeholder.svg';

	const images = [
		{
			id: 0,
			image: product?.image,
			created_at: '',
			updated_at: '',
			deleted_at: null,
		},
		...product?.product_image,
	];

	const changeImage = (direction: 1 | -1) => {
		if (images.length === 0) return;
		setIsFading(true);
		setTimeout(() => {
			setCurrentIndex(
				(prev) => (prev + direction + images.length) % images.length,
			);
			setIsFading(false);
		}, 150);
	};

	const nextImage = () => changeImage(1);
	const previousImage = () => changeImage(-1);

	return (
		<Card>
			<CardContent>
				<div className="relative aspect-square">
					<Button
						variant="ghost"
						size="icon"
						className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white"
						onClick={previousImage}
					>
						<ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
					</Button>

					<div className="relative w-full h-full overflow-hidden rounded-2xl group bg-stone-100">
						<img
							src={
								images[currentIndex]?.image
									? `${env.baseAPI}/${images[currentIndex]?.image}`
									: '/placeholder.svg'
							}
							alt={product.name}
							className={`object-cover w-full h-full transition-all  group-hover:scale-110   duration-200 ${
								isFading ? 'opacity-0' : 'opacity-100'
							}`}
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
					{images.slice(0, 5).map((img, index) => (
						<button
							key={img.id}
							onClick={() => {
								if (index === currentIndex) return;
								setIsFading(true);
								setTimeout(() => {
									setCurrentIndex(index);
									setIsFading(false);
								}, 150);
							}}
							className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all
              ${
								currentIndex === index
									? 'ring-2 ring-black'
									: 'hover:ring-1 hover:ring-gray-200'
							}`}
						>
							<img
								src={
									img.image ? `${env.baseAPI}/${img.image}` : '/placeholder.svg'
								}
								alt={`${product.name} thumbnail ${index}`}
								className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
							/>
						</button>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
