import { useState } from 'react';
// Import Swiper React components
import { motion } from 'motion/react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './style.module.css';

// Import Swiper styles
import {
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle,
} from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { BASE_URL } from '@/lib/env';
import Image from 'next/image';
import { FreeMode, Navigation, Thumbs, Virtual } from 'swiper/modules';

function SliderOfSD({ data }: { data: any }) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
	const images = data?.serviceimages;
	const allImage = [
		{
			id: images ? images[images?.length - 1]?.id + 1 || 1 : 0,
			images: data?.image,
		},
		...images,
	];
	return (
		<>
			<Swiper
				loop={true}
				spaceBetween={10}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				modules={[FreeMode, Navigation, Thumbs, Virtual]}
				className="mySwiper2-slider-of-service-dt"
				navigation={{
					nextEl: '.custom-next-icon',
					prevEl: '.custom-prev-icon',
				}}
			>
				{allImage?.map((e: any, i: number) => (
					<SwiperSlide key={e.id} virtualIndex={i}>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									delay: 0.12,
									duration: 0.2,
								},
							}}
							className={style.topSliderImg}
						>
							<Image
								className={style.sliderImages}
								src={`${BASE_URL}/${e?.images}`}
								alt="Service Slider Image"
								width={760}
								height={361}
							/>
						</motion.div>
					</SwiperSlide>
				))}
				<div className="custom-prev-icon">
					<IoIosArrowDropleftCircle />
				</div>
				<div className="custom-next-icon">
					<IoIosArrowDroprightCircle />
				</div>
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				navigation={{
					nextEl: '.custom-next-icon',
					prevEl: '.custom-prev-icon',
				}}
				spaceBetween={10}
				slidesPerView={3}
				freeMode={true}
				breakpoints={{
					480: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
					640: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 5,
						spaceBetween: 10,
					},

					1024: {
						slidesPerView: 6,
						spaceBetween: 10,
					},
				}}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs, Virtual]}
				className={'mySwiper2-slider-of-service-dt-thumb'}
			>
				{allImage?.map((e: any, i: number) => (
					<SwiperSlide key={e.id} virtualIndex={i}>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									delay: 0.12,
									duration: 0.2,
								},
							}}
							className={style.topSliderImgSmall}
						>
							<Image
								className={style.sliderImages}
								src={`${BASE_URL}/${e?.images}`}
								alt="Service Slider Image"
								width={760}
								height={361}
							/>
						</motion.div>
					</SwiperSlide>
				))}
				<div className="custom-prev-icon">
					<IoIosArrowDropleftCircle />
				</div>
				<div className="custom-next-icon">
					<IoIosArrowDroprightCircle />
				</div>
			</Swiper>
		</>
	);
}

export default SliderOfSD;
