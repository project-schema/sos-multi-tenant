'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { iHomeOffer } from '@/store/features/vendor/cms/home-page/offer/type';
import AutoScroll from 'embla-carousel-auto-scroll';
import * as React from 'react';

export const TopPromotionalBar = ({ offers }: { offers: iHomeOffer[] }) => {
	const autoScroll = React.useMemo(
		() =>
			AutoScroll({
				speed: 1, // lower = slower smooth marquee
				stopOnMouseEnter: false,
				stopOnInteraction: false,
			}),
		[],
	);

	return (
		<div className="bg-black text-white py-3 overflow-hidden">
			<div className="w-full px-4 sm:px-6 lg:px-8">
				<Carousel
					plugins={[autoScroll]}
					opts={{
						align: 'start',
						loop: true,
						dragFree: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-0 gap-16">
						{offers.map((offer, index) => (
							<CarouselItem key={index} className="basis-auto">
								<div className="flex items-center gap-16 text-xs whitespace-nowrap">
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
