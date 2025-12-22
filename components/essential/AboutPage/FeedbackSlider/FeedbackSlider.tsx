'use client';
import { env } from '@/lib/env';
import { iSettingsType, iTestimonialsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './FeedbackSlider.style.module.css';
import Rating from './Rating';

const FeedbackSlider = ({
	settings,
	testimonials,
}: {
	settings: iSettingsType;
	testimonials: iTestimonialsType;
}) => {
	const settingData = settings?.message;

	const data = testimonials?.message;

	return (
		<div className={style.mainFeedbackSection}>
			<motion.h4
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5,
					},
				}}
				className={style.feedbackTopHeader}
			>
				{settingData?.testimonial_title}
			</motion.h4>
			<motion.h1
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.25,
						duration: 0.5,
					},
				}}
				className={style.feedbackHeader}
			>
				{settingData?.testimonial_heading}
			</motion.h1>

			<Swiper
				slidesPerView={3}
				centeredSlides={false}
				spaceBetween={24}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				modules={[Pagination, Autoplay]}
				breakpoints={{
					0: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					400: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					1080: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					1500: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
				}}
				className="mySwiper"
			>
				{data?.map((singleData: any) => (
					<SwiperSlide key={singleData?.id}>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									delay: 0.2,
									duration: 0.5,
								},
							}}
							className={style.singleFeedback}
							key={singleData.id}
						>
							<div className={style.feedbackComma}>
								<svg
									className={style.feedbackIcon}
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
								>
									<path
										fill="currentColor"
										d="M13.5 7.5a3.5 3.5 0 1 0-1.876 3.101c-.234.868-.564 1.595-.959 2.175C9.875 13.938 8.84 14.5 7.75 14.5a.75.75 0 0 0 0 1.5c1.671 0 3.137-.883 4.156-2.38c1.01-1.486 1.594-3.583 1.594-6.12Z"
									/>
								</svg>
								<svg
									className={style.secondFeedbackIcon}
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
								>
									<path
										fill="currentColor"
										d="M13.5 7.5a3.5 3.5 0 1 0-1.876 3.101c-.234.868-.564 1.595-.959 2.175C9.875 13.938 8.84 14.5 7.75 14.5a.75.75 0 0 0 0 1.5c1.671 0 3.137-.883 4.156-2.38c1.01-1.486 1.594-3.583 1.594-6.12Z"
									/>
								</svg>
							</div>
							<p className={style.feedbackParagraph}>
								{singleData.description}
							</p>
							<div className={style.feedbackPersonInfo}>
								<div className={style.feedbackPersonDetails}>
									<Image
										className={style.feedbackImage}
										src={
											singleData?.image
												? `${env.baseAPI}/${singleData?.image}`
												: '/placeholder.svg'
										}
										alt="Feedback Image"
										width={50}
										height={50}
										unoptimized
									/>
									<div>
										<h5 className={style.feedbackPersonName}>
											{singleData.name}
										</h5>
										<p className={style.feedbackPersonPosition}>
											{singleData.designation}
										</p>
									</div>
								</div>
								<Rating rating={singleData?.rating} />
							</div>
						</motion.div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default FeedbackSlider;
