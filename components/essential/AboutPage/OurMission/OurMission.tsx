'use client';

import { env } from '@/lib/env';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { iMissionsType, iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import style from './OurMission.style.module.css';

const OurMission = ({
	missions,
	settings,
}: {
	missions: iMissionsType;
	settings: iSettingsType;
}) => {
	const data = settings.message;
	const ourMissions = missions?.message;

	// Reusable animation variants
	const fadeIn = (delay = 0.2) => ({
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: { duration: 0.5, delay },
		},
	});

	return (
		<section className={style.ourMission}>
			<div className="layout">
				<div className={style.mission}>
					<motion.div
						variants={fadeIn(0.2)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className={style.leftImg}
					>
						<Image
							src={`${env.baseAPI}/${data.mission_image}`}
							alt="Mission Image"
							width={530}
							height={500}
							unoptimized
						/>
					</motion.div>

					<div className={style.rightContent}>
						<motion.h4
							variants={fadeIn(0.2)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className={style.missionTopHeader}
						>
							{data.mission_title}
						</motion.h4>

						<motion.h1
							variants={fadeIn(0.25)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className={style.missionHeader}
						>
							{data.mission_heading}
						</motion.h1>

						<motion.p
							variants={fadeIn(0.3)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className={style.missionParagraph}
						>
							{data.mission_description}
						</motion.p>

						<div className={style.missionFooter}>
							{ourMissions?.map((singleData, i: number) => (
								<motion.div
									key={singleData?.id}
									variants={fadeIn(0.35 + i * 0.1)}
									initial="hidden"
									whileInView="show"
									viewport={{ once: true }}
									className={style.missionFooterContent}
								>
									{/* Optional Icon here */}
									<DynamicIcon
										icon={singleData.icon_class}
										className="size-6"
									/>
									<span className={style.footerContent}>
										{singleData.title}
									</span>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurMission;
