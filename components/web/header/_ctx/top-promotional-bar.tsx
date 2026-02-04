'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { iHomeOffer } from '@/store/features/vendor/cms/home-page/offer/type';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

export const TopPromotionalBar = ({ offers }: { offers: iHomeOffer[] }) => {
	const autoplayPlugin = React.useMemo(
		() =>
			Autoplay({
				delay: 3000,
				stopOnMouseEnter: false,
				stopOnFocusIn: false,
				playOnInit: true,
			}),
		[]
	);

	return (
		<div className="bg-black text-white py-3">
			<div className="w-full px-4 sm:px-6 lg:px-8">
				<Carousel
					plugins={[autoplayPlugin]}
					opts={{
						align: 'start',
						loop: true,
						dragFree: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-0">
						{offers.map((offer, index) => (
							<CarouselItem key={index} className="pl-0 basis-auto pr-6">
								<div className="flex items-center gap-3 text-xs whitespace-nowrap">
									<span>{offer.title}</span>
									{index < offers.length - 1 && (
										<span className="text-white">•</span>
									)}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
};
