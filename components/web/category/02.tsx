'use client';
import { iCategory } from '@/store/features/admin/category';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card13 from '../card/13';

export function Category02({ categories }: { categories: iCategory[] | null }) {
	return (
		<div>
			<Swiper
				spaceBetween={15}
				slidesPerView={6}
				loop={true}
				// autoplay={{
				// 	delay: 5000,
				// 	disableOnInteraction: false,
				// }}
				autoplay={false}
				speed={1000}
				className="w-full h-full"
				breakpoints={{
					0: {
						slidesPerView: 2,
						spaceBetween: 8,
					},

					1024: {
						slidesPerView: 3,
						spaceBetween: 15,
					},
				}}
				modules={[Autoplay, Pagination]}
			>
				{categories?.map((category, index) => (
					<SwiperSlide key={index} className="h-full">
						<Card13 category={category} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
