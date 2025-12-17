'use client';

import { imageFormat } from '@/lib';
import { motion } from 'framer-motion';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import SwiperCore from 'swiper';
import { FreeMode, Navigation, Thumbs, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './style.module.css';

type ImageType = { id?: number; images?: string } | string;

export default function SliderOfSD({ images = [] as ImageType[] }) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

	const normalized = useMemo(
		() =>
			(images as ImageType[])?.map((img, idx) =>
				typeof img === 'string'
					? { id: idx, image: img }
					: { id: img?.id || idx, image: imageFormat(img?.images || '') }
			) || [],
		[images]
	);

	return (
		<>
			<div id="f-service-details-slider" className={style.sliderWrapper}>
				<Swiper
					loop={true}
					spaceBetween={10}
					thumbs={{
						swiper:
							thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
					}}
					modules={[FreeMode, Navigation, Thumbs, Virtual]}
					className="mySwiper2-slider-of-service-dt"
					navigation={{
						nextEl: '.custom-next-icon',
						prevEl: '.custom-prev-icon',
					}}
				>
					{normalized.map((img, i) => (
						<SwiperSlide key={img.id} virtualIndex={i}>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: { delay: 0.12, duration: 0.2 },
								}}
								className={style.topSliderImg}
							>
								<img
									className={style.sliderImages}
									src={img.image || '/placeholder.svg'}
									alt={`Slide ${i + 1}`}
									width={760}
									height={361}
								/>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>

				<div className={`custom-prev-icon`}>
					<ChevronLeftCircle size={32} strokeWidth={1.5} />
				</div>
				<div className={`custom-next-icon`}>
					<ChevronRightCircle size={32} strokeWidth={1.5} />
				</div>
			</div>

			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={10}
				slidesPerView={3}
				freeMode={true}
				breakpoints={{
					480: { slidesPerView: 4, spaceBetween: 10 },
					640: { slidesPerView: 4, spaceBetween: 10 },
					768: { slidesPerView: 5, spaceBetween: 10 },
					1024: { slidesPerView: 6, spaceBetween: 10 },
				}}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs, Virtual]}
				className="mySwiper2-slider-of-service-dt-thumb"
			>
				{normalized.map((img, i) => (
					<SwiperSlide key={img.id} virtualIndex={i}>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: { delay: 0.12, duration: 0.2 },
							}}
							className={style.topSliderImgSmall}
						>
							<img
								className={style.sliderImages}
								src={img.image || '/placeholder.svg'}
								alt={`Thumb ${i + 1}`}
								width={760}
								height={361}
							/>
						</motion.div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
