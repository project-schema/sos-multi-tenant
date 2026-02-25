'use client';

import { imageFormat } from '@/lib';
import { iBanner } from '@/store/features/vendor/cms/home-page/banner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade'; // Add this import
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Banner02({ banners }: { banners: iBanner[] | null }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef<any>(null);
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);

	const handleSlideChange = (swiper: any) => {
		setActiveIndex(swiper.realIndex);
	};

	const goToSlide = (index: number) => {
		swiperRef.current?.slideTo(index);
	};

	const goPrev = () => {
		swiperRef.current?.slidePrev();
	};

	const goNext = () => {
		swiperRef.current?.slideNext();
	};

	if (!banners || banners.length === 0) {
		return null; // or a placeholder
	}

	return (
		<div className="relative w-full overflow-hidden bg-gray-100">
			<Swiper
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				slidesPerView={1}
				loop={true}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				speed={700}
				watchSlidesProgress={true}
				grabCursor={true}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				onSlideChange={handleSlideChange}
				navigation={{
					prevEl: prevRef.current,
					nextEl: nextRef.current,
				}}
				onBeforeInit={(swiper) => {
					// Initialize navigation elements
					if (
						swiper.params.navigation &&
						typeof swiper.params.navigation !== 'boolean'
					) {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
					}
				}}
			>
				{banners?.map((slide) => (
					<SwiperSlide key={slide.id}>
						<Link href={slide.link ?? '#'} className="block relative w-full">
							<img
								src={imageFormat(slide.image ?? '')}
								alt={slide.title ?? ''}
								className="w-full object-cover 
                                h-[220px] 
                                sm:h-[320px] 
                                md:h-[450px] 
                                lg:h-[600px] 
                                xl:h-[700px]"
								loading="lazy"
							/>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Arrows */}
			<button
				ref={prevRef}
				onClick={goPrev}
				className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 
                w-8 h-8 md:w-10 md:h-10 
                bg-white/80 backdrop-blur-sm rounded-full 
                flex items-center justify-center shadow-lg
                hover:bg-white transition-colors"
			>
				<ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
			</button>

			<button
				ref={nextRef}
				onClick={goNext}
				className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 
                w-8 h-8 md:w-10 md:h-10 
                bg-white/80 backdrop-blur-sm rounded-full 
                flex items-center justify-center shadow-lg
                hover:bg-white transition-colors"
			>
				<ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
			</button>

			{/* Custom Pagination */}
			<div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-20">
				<div className="flex space-x-2">
					{banners?.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
								activeIndex === index
									? 'bg-white scale-125'
									: 'bg-white/60 hover:bg-white/80'
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>

			{/* Counter */}
			<div className="absolute bottom-3 md:bottom-6 right-3 md:right-6 z-20">
				<div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs">
					{activeIndex + 1} / {banners?.length}
				</div>
			</div>
		</div>
	);
}
