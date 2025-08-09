'use client';

import BtnLink from '@/components/frontend/BtnLink';
import { img } from '@/lib';
import { iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import bannerV1 from './banner-v-1.svg';
import bannerV2 from './banner-v-2.svg';
import style from './banner.style.module.css';
import rocket from './rocket.svg';

function Banner({ settings }: { settings: iSettingsType }) {
	const data = settings?.message;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, amount: 0.2 }}
		>
			<section className={style.banner}>
				<div className="layout">
					<div className={style.rocketWrap}>
						<div className={style.content}>
							<motion.div
								initial={{ y: 100, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: { delay: 0.2, duration: 0.5 },
								}}
								viewport={{ once: true, amount: 0.2 }}
							>
								<h1 className={style.heading}>{data.home_banner_heading}</h1>
							</motion.div>

							<motion.div
								initial={{ y: 100, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: { delay: 0.3, duration: 0.5 },
								}}
								viewport={{ once: true, amount: 0.2 }}
							>
								<p className={style.paragraph}>
									{data.home_banner_description}
								</p>
							</motion.div>

							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: { delay: 0.5, duration: 0.6 },
								}}
								viewport={{ once: true, amount: 0.2 }}
							>
								<div className={style?.btnBox}></div>
								<BtnLink
									path="/advertise"
									text="Get Started"
									icon={img.arrowIcon}
								/>
							</motion.div>
						</div>

						<Image alt="rocket-icon" className={style.rocket} src={rocket} />
					</div>
				</div>

				<Image
					alt="banner-vector-1"
					className={style.bannerV1}
					src={bannerV1}
				/>
				<Image
					alt="banner-vector-2"
					className={style.bannerV2}
					src={bannerV2}
				/>
			</section>
		</motion.div>
	);
}

export default Banner;
