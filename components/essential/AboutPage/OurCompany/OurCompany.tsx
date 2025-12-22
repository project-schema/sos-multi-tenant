'use client';

import { env } from '@/lib';
import { iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import style from './OurCompany.style.module.css';

const fadeUp = (delay = 0.2) => ({
	hidden: { opacity: 0, y: 100 },
	show: {
		opacity: 1,
		y: 0,
		transition: { delay, duration: 0.5 },
	},
});

const fadeIn = (delay = 0.3) => ({
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { delay, duration: 0.5 },
	},
});

const OurCompany = ({ settings }: { settings: iSettingsType }) => {
	const companyData = settings.message;

	return (
		<section className={style.ourCompany}>
			<div className="layout">
				<div className={style.company}>
					<div className={style.leftContent}>
						<motion.h5
							variants={fadeUp(0.2)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className={style.companyTopHeader}
						>
							{companyData.about_banner_title}
						</motion.h5>

						<motion.h1
							variants={fadeUp(0.3)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className={style.companyHeader}
						>
							{companyData.about_banner_heading}
						</motion.h1>

						<motion.p
							variants={fadeUp(0.4)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className={style.companyParagraph}
						>
							{companyData.about_banner_description}
						</motion.p>

						<div className={style.companyFooter}>
							{[
								{
									count: companyData.about_banner_increment_one_count,
									title: companyData.about_banner_increment_one_title,
								},
								{
									count: companyData.about_banner_increment_two_count,
									title: companyData.about_banner_increment_otwo_title,
								},
								{
									count: companyData.about_banner_increment_othree_count,
									title: companyData.about_banner_increment_three_title,
								},
							].map((item, index) => (
								<motion.div
									key={index}
									variants={fadeIn(0.6 + index * 0.1)}
									initial="hidden"
									whileInView="show"
									viewport={{ once: true }}
									className={style.flexColumn}
								>
									<h2 className={style.companyExperience}>{item.count}</h2>
									<p className={style.companyExperienceType}>{item.title}</p>
								</motion.div>
							))}
						</div>
					</div>

					<motion.div
						variants={fadeIn(0.3)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className={style.rightImg}
					>
						<Image
							alt="Company-img"
							src={`${env.baseAPI}/${companyData?.about_banner_image}`}
							width={532}
							height={550}
							unoptimized
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default OurCompany;
