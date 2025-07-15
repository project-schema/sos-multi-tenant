'use client';
import style from './partners.module.css';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { BASE_URL, env } from '@/lib/env';
import { iPartnersType, iSettingsType } from '@/types';
import Heading from '@/components/frontend/Heading';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

function Partners({
	settings,
	partners,
}: {
	settings: iSettingsType;
	partners: iPartnersType;
}) {
	const data = settings?.message;
	const dummyData = partners?.message;

	return (
		<section className="layout">
			{/* Animated heading */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				viewport={{ once: true, amount: 0.3 }}
			>
				<Heading
					h1={data.partner_title}
					p={data.partner_heading}
					center="center"
				/>
			</motion.div>

			{/* Animated Swiper container */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, delay: 0.4 }}
				viewport={{ once: true, amount: 0.3 }}
			>
				<Swiper
					spaceBetween={24}
					centeredSlides={false}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					breakpoints={{
						1500: {
							slidesPerView: 6,
							spaceBetween: 24,
						},
						1100: {
							slidesPerView: 5,
							spaceBetween: 24,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 24,
						},
						776: {
							slidesPerView: 3,
							spaceBetween: 24,
						},
						414: {
							slidesPerView: 2,
							spaceBetween: 24,
						},
					}}
					modules={[Autoplay, Pagination, Navigation]}
					className={style.mySwiper}
				>
					{dummyData?.map((e: any) => (
						<SwiperSlide
							key={e.id}
							style={{
								paddingBottom: '20px',
								paddingTop: '20px',
								marginTop: '40px',
								marginBottom: '30px',
							}}
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4 }}
								viewport={{ once: true, amount: 0.2 }}
								className={style.imgBox}
							>
								<Image
									alt={`Partner ${e.id}`}
									className={style.img}
									src={`${env.baseAPI}/${e.image}`}
									width={133}
									height={40}
								/>
							</motion.div>
						</SwiperSlide>
					))}
				</Swiper>
			</motion.div>
		</section>
	);
}

export default Partners;
