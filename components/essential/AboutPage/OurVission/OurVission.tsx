'use client';
import { env } from '@/lib';
import { iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import style from './OurVissin.style.module.css';

const OurVission = ({ settings }: { settings: iSettingsType }) => {
	const data = settings.message;

	const fadeIn = (delay = 0.2) => ({
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: { duration: 0.5, delay },
		},
	});

	return (
		<section className={style.ourVission}>
			<div className="layout">
				<div className={style.vission}>
					<motion.h5
						variants={fadeIn(0.2)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className={style.vissionTopHeader}
					>
						{data.vision_title}
					</motion.h5>

					<motion.h1
						variants={fadeIn(0.25)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className={style.vissionHeader}
					>
						{data.vision_heading}
					</motion.h1>

					<motion.p
						variants={fadeIn(0.3)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className={style.vissionParagraph}
					>
						{data.vision_description}
					</motion.p>

					<div className={style.vissionFooter}>
						<motion.div
							variants={fadeIn(0.3)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
						>
							<Image
								className={style.vissionImg}
								alt="Vission-img"
								src={`${env.baseAPI}/${data?.vision_image_one}`}
								width={312}
								height={287}
							/>
						</motion.div>

						<motion.div
							variants={fadeIn(0.2)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
						>
							<Image
								className={style.vissionImg2}
								alt="Vission-img2"
								src={`${env.baseAPI}/${data?.vision_image_two}`}
								width={648}
								height={287}
							/>
						</motion.div>

						<motion.div
							variants={fadeIn(0.3)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
						>
							<Image
								className={style.vissionImg3}
								alt="Vission-img3"
								src={`${env.baseAPI}/${data?.vision_image_three}`}
								width={312}
								height={287}
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurVission;
