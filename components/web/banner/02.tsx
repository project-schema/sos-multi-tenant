'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { imageFormat } from '@/lib';
import { iBanner } from '@/store/features/vendor/cms/home-page/banner';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner02({ banners }: { banners: iBanner[] | null }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef<any>(null);

	const handleSlideChange = (swiper: any) => {
		setActiveIndex(swiper.realIndex);
	};

	const goToSlide = (index: number) => {
		if (swiperRef.current?.swiper) {
			swiperRef.current.swiper.slideTo(index);
		}
	};

	const goPrev = () => {
		if (swiperRef.current?.swiper) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	const goNext = () => {
		if (swiperRef.current?.swiper) {
			swiperRef.current.swiper.slideNext();
		}
	};

	return (
		<div className="relative w-full max-h-[700px] overflow-hidden bg-gray-100">
			<Swiper
				ref={swiperRef}
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				effect="fade"
				fadeEffect={{
					crossFade: true,
				}}
				speed={1200}
				onSlideChange={handleSlideChange}
				className="w-full h-full max-h-[700px]"
			>
				{banners?.map((slide) => (
					<SwiperSlide key={slide.id}>
						<Link
							href={slide.link ?? ''}
							className="block relative w-full h-full max-h-[700px]"
						>
							<img
								src={imageFormat(slide.image ?? '')}
								alt={slide.title ?? ''}
								className="w-full h-[700px] object-cover"
								loading="lazy"
							/>
							{/* Subtle overlay for better navigation visibility */}
						</Link>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Navigation Arrows */}
			<button
				onClick={goPrev}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-lg"
				aria-label="Previous slide"
			>
				<ChevronLeft className="w-5 h-5" />
			</button>

			<button
				onClick={goNext}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-lg"
				aria-label="Next slide"
			>
				<ChevronRight className="w-5 h-5" />
			</button>

			{/* Pagination Dots */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex space-x-2">
					{banners?.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
								activeIndex === index
									? 'bg-white scale-125 shadow-lg'
									: 'bg-white bg-opacity-60 hover:bg-opacity-80'
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>

			{/* Slide Counter */}
			<div className="absolute bottom-6 right-6 z-20">
				<div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs font-medium">
					{activeIndex + 1} / {banners?.length}
				</div>
			</div>
		</div>
	);
}
