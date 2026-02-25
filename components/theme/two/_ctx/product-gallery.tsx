'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';
import { imageFormat } from '@/lib';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import Image from 'next/image';
import * as React from 'react';

export function ProductGallery({ product }: { product: iVendorProductView }) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [thumbApi, setThumbApi] = React.useState<CarouselApi>();

	const images = [
		product?.image,
		...product?.product_image?.map((p) => p.image),
	];

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
			thumbApi?.scrollTo(api.selectedScrollSnap());
		});
	}, [api, thumbApi]);

	const onThumbClick = React.useCallback(
		(index: number) => {
			api?.scrollTo(index);
		},
		[api],
	);

	return (
		<>
			{/* Main Carousel */}
			<Carousel setApi={setApi} className="w-full">
				<CarouselContent>
					{images?.map((src, index) => (
						<CarouselItem key={`main-${index}`}>
							<div
								className="relative w-full bg-gray-100 rounded-md overflow-hidden
                aspect-square
                md:aspect-[4/5]
                max-h-[500px] lg:max-h-[550px] 2xl:max-h-[600px]"
							>
								<Image
									src={imageFormat(src)}
									alt={`Product image ${index + 1}`}
									fill
									sizes="(max-width: 768px) 100vw,
           (max-width: 1280px) 50vw,
           600px"
									className="object-contain"
									priority={index === 0}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Thumbnail Carousel */}
			<div className="mt-3">
				<Carousel
					setApi={setThumbApi}
					opts={{
						containScroll: 'keepSnaps',
						dragFree: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-2">
						{images?.map((src, index) => (
							<CarouselItem
								key={`thumb-${index}`}
								className="pl-2 basis-auto h-[76px]"
							>
								<button
									onClick={() => onThumbClick(index)}
									className={`
										aspect-square rounded-md overflow-hidden bg-gray-100 border-2 transition-all h-full
										${
											current === index + 1
												? 'border-orange-500 ring-2 ring-orange-500/20'
												: 'border-gray-200 hover:border-gray-300'
										}
									`}
								>
									<div className="relative w-full h-full">
										<Image
											src={imageFormat(src)}
											alt={`Thumbnail ${index + 1}`}
											fill
											sizes="80px"
											className="object-cover"
										/>
									</div>
								</button>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</>
	);
}
