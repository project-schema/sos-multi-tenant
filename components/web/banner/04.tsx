'use client';

import { Button } from '@/components/ui/button';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import { imageFormat } from '@/lib';
import { iBanner } from '@/store/features/vendor/cms/home-page/banner';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export default function Banner04({ banners }: { banners?: iBanner[] }) {
	const autoplayPlugin = React.useMemo(
		() =>
			Autoplay({
				delay: 5000,
				stopOnMouseEnter: true,
				stopOnFocusIn: false,
			}),
		[]
	);

	if (!banners || banners.length === 0) return null;

	return (
		<div className="w-full py-[72px] bg-[#F2E4D8]">
			<div className="max-w-[1500px] mx-auto px-4">
				<Carousel
					plugins={[autoplayPlugin]}
					opts={{
						align: 'start',
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent>
						{banners.map((banner, index) => (
							<CarouselItem key={index}>
								<div className="grid grid-cols-12 gap-24 items-center">
									<div className="space-y-7 col-span-12 md:col-span-7">
										<h1 className="text-[40px] md:text-[64px] font-bold text-primary3 capitalize font-kalnia">
											{banner.title}
										</h1>
										<p className="text-gray-700 text-base md:text-lg font-montserrat">
											{banner.subtitle}
										</p>
										{banner.link && (
											<Link href={banner.link}>
												<Button variant="style3" size="style3">
													Shop Now
													<ArrowRight className="w-4 h-4" />
												</Button>
											</Link>
										)}
									</div>
									<div className="col-span-12 md:col-span-5 mt-8 md:mt-0">
										<div className="relative m-4">
											<span className="absolute top-4 left-4 w-full h-full bg-transparent border border-gray-400 rounded-ss-[160px] rounded-br-[160px]"></span>
											<img
												src={imageFormat(banner.image || null)}
												alt={banner.title || 'Banner image'}
												width={1000}
												height={1000}
												className="relative z-10 rounded-ss-[160px] rounded-br-[160px] h-[585px] w-full object-cover block"
											/>
										</div>
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
}
