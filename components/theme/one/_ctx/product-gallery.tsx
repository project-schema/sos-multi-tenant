'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';
import { imageFormat } from '@/lib';
import { iVendorProductView } from '@/store/features/vendor/product/vendor-product-type';
import * as React from 'react';

export function ProductGallery({ product }: { product?: iVendorProductView }) {
	const [api, setApi] = React.useState<CarouselApi>();
	const [current, setCurrent] = React.useState(0);
	const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
	const images = [
		imageFormat(product?.image ?? null),
		...(product?.product_image?.map((p) => imageFormat(p.image ?? null)) ?? []),
	];

	// const images = [
	// 	'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=2069&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2069&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=2069&auto=format&fit=crop',
	// 	'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2069&auto=format&fit=crop',
	// ];

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
		[api]
	);

	return (
		<>
			{/* Main Carousel */}
			<Carousel setApi={setApi} className="w-full">
				<CarouselContent>
					{images.map((src, index) => (
						<CarouselItem key={`main-${index}`}>
							<div className="w-full h-[350px] md:h-[380px] 2xl:h-[430px] bg-gray-100 rounded-md overflow-hidden relative">
								<img
									src={src ?? null}
									alt={`Product image ${index + 1}`}
									className="object-cover"
									width={1000}
									height={1000}
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
						{images.map((src, index) => (
							<CarouselItem
								key={`thumb-${index}`}
								className="pl-2 basis-auto h-[76px] "
							>
								<button
									onClick={() => onThumbClick(index)}
									className={`
										aspect-square rounded-md overflow-hidden bg-gray-100 border-2 transition-all h-full
										${
											current === index + 1
												? 'border-orange-500 ring-2 ring-orange-200'
												: 'border-gray-200 hover:border-gray-300'
										}
									`}
								>
									<img
										src={src}
										alt={`Thumbnail ${index + 1}`}
										width={76}
										height={76}
										className="w-full h-full object-cover"
									/>
								</button>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</>
	);
}
