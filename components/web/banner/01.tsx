'use client';

import {
	ChevronLeft,
	ChevronRight,
	Heart,
	ShoppingBag,
	Star,
} from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BannerSlide {
	id: number;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	price?: string;
	originalPrice?: string;
	discount?: string;
	rating: number;
	buttonText: string;
	buttonLink: string;
	badge?: string;
}

const bannerSlides: BannerSlide[] = [
	{
		id: 1,
		title: 'Elegant Traditional Collection',
		subtitle: 'Premium Ethnic Wear',
		description:
			'Discover our exquisite collection of traditional South Asian attire featuring intricate embroidery and contemporary designs.',
		image:
			'https://images.unsplash.com/photo-1594736797933-d0d3d1e7f5c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		price: '৳2,499',
		originalPrice: '৳3,999',
		discount: '37% OFF',
		rating: 4.8,
		buttonText: 'Shop Collection',
		buttonLink: '/category/traditional',
		badge: 'Best Seller',
	},
	{
		id: 2,
		title: 'Modern Panjabi Collection',
		subtitle: 'Contemporary Ethnic Fashion',
		description:
			'Blend tradition with modernity in our stunning panjabi collection, perfect for any occasion.',
		image:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		price: '৳1,899',
		originalPrice: '৳2,499',
		discount: '24% OFF',
		rating: 4.9,
		buttonText: 'Explore Panjabi',
		buttonLink: '/category/panjabi',
		badge: 'New Arrival',
	},
	{
		id: 3,
		title: 'Premium Shirt Collection',
		subtitle: 'Formal & Casual Wear',
		description:
			'From boardroom meetings to casual outings, our shirt collection offers unmatched style and comfort.',
		image:
			'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		price: '৳1,299',
		originalPrice: '৳1,799',
		discount: '28% OFF',
		rating: 4.7,
		buttonText: 'View Shirts',
		buttonLink: '/category/shirts',
		badge: 'Trending',
	},
	{
		id: 4,
		title: 'Denim & Casual Wear',
		subtitle: 'Comfort Meets Style',
		description:
			'Stay comfortable and stylish with our premium denim collection and casual wear essentials.',
		image:
			'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		price: '৳999',
		originalPrice: '৳1,499',
		discount: '33% OFF',
		rating: 4.6,
		buttonText: 'Shop Now',
		buttonLink: '/category/jeans',
		badge: 'Limited Time',
	},
	{
		id: 5,
		title: 'Luxury Designer Collection',
		subtitle: 'Exclusive Premium Line',
		description:
			'Indulge in our exclusive designer collection featuring the finest materials and craftsmanship.',
		image:
			'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
		price: '৳4,999',
		originalPrice: '৳6,999',
		discount: '29% OFF',
		rating: 5.0,
		buttonText: 'Discover Luxury',
		buttonLink: '/category/designer',
		badge: 'Exclusive',
	},
];

export default function Banner01() {
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
		<div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
			<Swiper
				ref={swiperRef}
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				effect="fade"
				fadeEffect={{
					crossFade: true,
				}}
				speed={1000}
				onSlideChange={handleSlideChange}
				className="w-full h-full"
			>
				{bannerSlides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="relative w-full h-full">
							{/* Background Image */}
							<div
								className="absolute inset-0 bg-cover bg-center bg-no-repeat"
								style={{ backgroundImage: `url(${slide.image})` }}
							>
								<div className="absolute inset-0 bg-black bg-opacity-40"></div>
							</div>

							{/* Content */}
							<div className="relative z-10 h-full flex items-center">
								<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
										{/* Left Side - Text Content */}
										<div className="text-white space-y-6">
											{/* Badge */}
											{slide.badge && (
												<div className="inline-block">
													<span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
														{slide.badge}
													</span>
												</div>
											)}

											{/* Title */}
											<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
												{slide.title}
											</h1>

											{/* Subtitle */}
											<h2 className="text-xl md:text-2xl text-gray-200 font-medium">
												{slide.subtitle}
											</h2>

											{/* Description */}
											<p className="text-lg text-gray-300 max-w-lg leading-relaxed">
												{slide.description}
											</p>

											{/* Rating */}
											<div className="flex items-center space-x-2">
												<div className="flex items-center space-x-1">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`w-5 h-5 ${
																i < Math.floor(slide.rating)
																	? 'text-yellow-400 fill-current'
																	: 'text-gray-400'
															}`}
														/>
													))}
												</div>
												<span className="text-gray-300">
													{slide.rating} (
													{Math.floor(Math.random() * 500) + 100} reviews)
												</span>
											</div>

											{/* Price */}
											<div className="flex items-center space-x-4">
												<span className="text-3xl font-bold text-white">
													{slide.price}
												</span>
												{slide.originalPrice && (
													<span className="text-xl text-gray-400 line-through">
														{slide.originalPrice}
													</span>
												)}
												{slide.discount && (
													<span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
														{slide.discount}
													</span>
												)}
											</div>

											{/* Action Buttons */}
											<div className="flex flex-col sm:flex-row gap-4">
												<Link
													href={slide.buttonLink}
													className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
												>
													<ShoppingBag className="w-5 h-5 mr-2" />
													{slide.buttonText}
												</Link>
												<button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300">
													<Heart className="w-5 h-5 mr-2" />
													Add to Wishlist
												</button>
											</div>
										</div>

										{/* Right Side - Additional Content or Image */}
										<div className="hidden lg:block">
											<div className="relative">
												<div className="w-96 h-96 mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-full flex items-center justify-center">
													<div className="text-center text-white">
														<div className="text-6xl font-bold mb-2">
															{slide.id}
														</div>
														<div className="text-xl">Collection</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Navigation Arrows */}
			<button
				onClick={goToPrev}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300 group"
			>
				<ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
			</button>

			<button
				onClick={goToNext}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300 group"
			>
				<ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
			</button>

			{/* Pagination */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex space-x-2">
					{bannerSlides.map((_, index) => (
						<button
							key={index}
							onClick={() => {
								if (swiperRef.current) {
									swiperRef.current.slideTo(index);
								}
							}}
							className={`w-3 h-3 rounded-full transition-all duration-300 ${
								activeIndex === index
									? 'bg-white scale-125'
									: 'bg-white bg-opacity-50 hover:bg-opacity-75'
							}`}
						/>
					))}
				</div>
			</div>

			{/* Slide Counter */}
			<div className="absolute bottom-8 right-8 z-20">
				<div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
					{activeIndex + 1} / {bannerSlides.length}
				</div>
			</div>
		</div>
	);
}
