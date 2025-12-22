'use client';
import BtnLink from '@/components/frontend/BtnLink';
import { env } from '@/lib';
import { iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import Style from './AdvertiseBanner.style.module.css';

function AdvertiseBanner({ settings }: { settings: iSettingsType }) {
	const data = settings?.message;

	return (
		<section className={Style.banner}>
			<div className="layout">
				<div className={Style.bannerWrapper}>
					<div className={Style.bannerLeftText}>
						<motion.h2
							initial={{ y: 50, opacity: 0 }}
							whileInView={{
								y: 0,
								opacity: 1,
								transition: {
									delay: 0.12,
									duration: 0.5,
								},
							}}
							className={Style.bannerHeading}
						>
							{data?.advertise_banner_heading}
						</motion.h2>

						<motion.p
							initial={{ y: 50, opacity: 0 }}
							whileInView={{
								y: 0,
								opacity: 1,
								transition: {
									delay: 0.3,
									duration: 0.5,
								},
							}}
							className={Style.bannerParagraph}
						>
							{data?.advertise_banner_description}
						</motion.p>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									delay: 0.4,
									duration: 0.5,
								},
							}}
						>
							<div className={Style?.btnBox}></div>
							<BtnLink path="/advertise/create" text="Boost your campaign" />
						</motion.div>
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								delay: 0.2,
								duration: 0.5,
							},
						}}
						className={Style.bannerRightImg}
					>
						{data?.advertise_banner_image && (
							<Image
								src={`${env.baseAPI}/${data?.advertise_banner_image}`}
								alt="BannerImg"
								className={Style.bannerImg}
								width={648}
								height={600}
								unoptimized
							/>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default AdvertiseBanner;
