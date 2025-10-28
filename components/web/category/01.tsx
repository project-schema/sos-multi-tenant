'use client';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card03 } from '../card';

export function Category01() {
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
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
				className="w-full h-full"
				breakpoints={{
					0: {
						slidesPerView: 3,
						spaceBetween: 15,
					},
					640: {
						slidesPerView: 4,
						spaceBetween: 15,
					},
					1024: {
						slidesPerView: 5,
						spaceBetween: 15,
					},
					1500: {
						slidesPerView: 6,
						spaceBetween: 15,
					},
				}}
				modules={[Autoplay, Pagination]}
			>
				<SwiperSlide>
					<Card03 />
				</SwiperSlide>
				<SwiperSlide>
					<Card03 />
				</SwiperSlide>
				<SwiperSlide>
					<Card03 />
				</SwiperSlide>
				<SwiperSlide>
					<Card03 />
				</SwiperSlide>
				<SwiperSlide>
					<Card03 />
				</SwiperSlide>
				<SwiperSlide>
					<Card03 />
				</SwiperSlide>
				<SwiperSlide>
					<Card03 />
				</SwiperSlide>
				<SwiperSlide>
					<Card03 />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
