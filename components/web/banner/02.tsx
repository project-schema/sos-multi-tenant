'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSlide {
	id: number;
	image: string;
	alt: string;
}

const imageSlides: ImageSlide[] = [
	{
		id: 1,
		image:
			'https://images.unsplash.com/photo-1594736797933-d0d3d1e7f5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		alt: 'Traditional South Asian Fashion Collection',
	},
	{
		id: 2,
		image:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		alt: 'Modern Panjabi Collection',
	},
	{
		id: 3,
		image:
			'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		alt: 'Premium Shirt Collection',
	},
	{
		id: 4,
		image:
			'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		alt: 'Denim & Casual Wear',
	},
	{
		id: 5,
		image:
			'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		alt: 'Luxury Designer Collection',
	},
	{
		id: 6,
		image:
			'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		alt: 'Elegant Ethnic Wear',
	},
	{
		id: 7,
		image:
			'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		alt: 'Contemporary Fashion',
	},
	{
		id: 8,
		image:
			'https://images.unsplash.com/photo-1571513720962-7b0a9a1c3d3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		alt: 'Fashion Show Collection',
	},
];

export default function Banner02() {
	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef<any>(null);

	const handleSlideChange = (swiper: any) => {
		setActiveIndex(swiper.realIndex);
	};

	const goToNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	};

	const goToPrev = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev();
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
				{imageSlides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="relative w-full h-full max-h-[700px]">
							<img
								src={slide.image}
								alt={slide.alt}
								className="w-full h-full max-h-[700px] object-cover"
								loading="lazy"
							/>
							{/* Subtle overlay for better navigation visibility */}
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Navigation Arrows */}
			<button
				onClick={goToPrev}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-lg"
				aria-label="Previous slide"
			>
				<ChevronLeft className="w-5 h-5" />
			</button>

			<button
				onClick={goToNext}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-lg"
				aria-label="Next slide"
			>
				<ChevronRight className="w-5 h-5" />
			</button>

			{/* Pagination Dots */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex space-x-2">
					{imageSlides.map((_, index) => (
						<button
							key={index}
							onClick={() => {
								if (swiperRef.current) {
									swiperRef.current.slideTo(index);
								}
							}}
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
					{activeIndex + 1} / {imageSlides.length}
				</div>
			</div>
		</div>
	);
}
