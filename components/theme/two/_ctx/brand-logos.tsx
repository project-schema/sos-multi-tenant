'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { imageFormat } from '@/lib';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

export function BrandLogos({
	brands,
}: {
	brands: { name: string; image: string; id: number }[] | null;
}) {
	const autoplayPlugin = React.useMemo(
		() =>
			Autoplay({
				delay: 3000,
				stopOnInteraction: false,
				stopOnMouseEnter: true,
				stopOnFocusIn: false,
			}),
		[]
	);

	return (
		<div className="max-w-[1720px] mx-auto px-4 lg:px-8">
			<div className={` border border-gray-200 rounded-lg p-4  `}>
				<Carousel
					plugins={[autoplayPlugin]}
					opts={{
						align: 'center',
						loop: true,
						dragFree: true,
						slidesToScroll: 'auto',
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{brands?.map((brand, index) => (
							<CarouselItem key={index} className="pl-2 md:pl-4 basis-auto">
								<div className="flex items-center justify-center h-16 sm:h-20 md:h-24 px-4 sm:px-6 md:px-8">
									<img
										src={imageFormat(brand.image)}
										alt={`Brand logo ${index + 1}`}
										width={120}
										height={60}
										className="w-auto h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
}
