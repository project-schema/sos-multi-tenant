'use client';
import { Card09 } from '@/components/web';
import { iVendorCategory } from '@/store/features';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export function CategorySections({
	categories,
}: {
	categories: iVendorCategory[] | null;
}) {
	return (
		<div>
			<Swiper
				spaceBetween={15}
				slidesPerView={6}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				speed={1000}
				className="w-full h-full"
				breakpoints={{
					0: {
						slidesPerView: 2,
						spaceBetween: 8,
					},
					640: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 15,
					},
					1440: {
						slidesPerView: 4,
						spaceBetween: 15,
					},
				}}
				modules={[Autoplay, Pagination]}
			>
				{categories?.map((category, index) => (
					<SwiperSlide key={index}>
						<Card09 data={category} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
