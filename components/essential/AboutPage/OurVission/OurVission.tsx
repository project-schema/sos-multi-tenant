import { BASE_URL } from '@/lib/env';
import style from './OurVissin.style.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

const OurVission = ({ getSettingsData }: any) => {
	const data = getSettingsData.message;

	return (
		<section className={style.ourVission}>
			<div className="layout">
				<div className={style.vission}>
					<motion.h5
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.2,
							},
						}}
						className={style.vissionTopHeader}
					>
						{data.vision_title}
					</motion.h5>
					<motion.h1
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.25,
							},
						}}
						className={style.vissionHeader}
					>
						{data.vision_heading}
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.3,
							},
						}}
						className={style.vissionParagraph}
					>
						{data.vision_description}
					</motion.p>
					<div className={style.vissionFooter}>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: 0.3,
								},
							}}
						>
							<Image
								className={style.vissionImg}
								alt="Vission-img"
								src={`${BASE_URL}/${data?.vision_image_one}`}
								width={312}
								height={287}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: 0.2,
								},
							}}
						>
							<Image
								className={style.vissionImg2}
								alt="Vission-img2"
								src={`${BASE_URL}/${data?.vision_image_two}`}
								width={648}
								height={287}
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: 0.3,
								},
							}}
						>
							<Image
								className={style.vissionImg3}
								alt="Vission-img3"
								src={`${BASE_URL}/${data?.vision_image_three}`}
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
