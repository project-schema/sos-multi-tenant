'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ProductSlider({ images }: { images: string[] }) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	return (
		<div className="theme-3-product-slider flex flex-col lg:grid lg:grid-cols-12 gap-6">
			{/* Main image */}
			<div className="order-1 lg:order-2 lg:col-span-10">
				<Swiper
					modules={[Navigation, Thumbs, Mousewheel]}
					thumbs={{
						swiper:
							thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					}}
					mousewheel={false}
					// mousewheel={
					// 	typeof window !== 'undefined' &&
					// 	window &&
					// 	window.screen.width > 1024
					// 		? true
					// 		: false
					// }
					spaceBetween={16}
					slidesPerView={1}
					className="bg-gray-100 rounded-md overflow-hidden"
				>
					{images.map((src, idx) => (
						<SwiperSlide key={idx}>
							<Image
								width={1000}
								height={1000}
								src={src}
								loading="lazy"
								alt={`Product ${idx + 1}`}
								className="w-full h-full object-contain max-h-[600px]"
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Thumbnails */}
			<div className="order-2 lg:order-1 lg:col-span-2 max-h-[600px]">
				<Swiper
					onSwiper={setThumbsSwiper}
					modules={[Navigation, Thumbs]}
					spaceBetween={12}
					slidesPerView={4}
					direction="horizontal"
					breakpoints={{
						1024: {
							direction: 'vertical',
							slidesPerView: 4,
						},
					}}
					className="w-full"
				>
					{images.map((src, idx) => (
						<SwiperSlide key={idx} className="!h-auto rounded-md">
							<div className="aspect-square rounded-md overflow-hidden bg-gray-100 border cursor-pointer">
								<Image
									width={500}
									height={500}
									loading="lazy"
									src={src}
									alt={`Thumb ${idx + 1}`}
									className="w-full h-full object-cover"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
