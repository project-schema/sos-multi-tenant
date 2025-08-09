'use client';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { iCompanionsType, iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import chooseImg1 from './chooseimg1.png';
import style from './ChooseUs.style.module.css';

const ChooseUs = ({
	settings,
	companions,
}: {
	settings: iSettingsType;
	companions: iCompanionsType;
}) => {
	const settingData = settings?.message;

	const companionsData = companions?.message;

	return (
		<section className={style.chooseUsSection}>
			<div className="layout">
				<motion.h4
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.5,
							delay: 0.2,
						},
					}}
					className={style.chooseTopHeader}
				>
					{settingData?.chose_us_two_title}
				</motion.h4>
				<motion.h1
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							duration: 0.5,
							delay: 0.25,
						},
					}}
					className={style.chooseHeader}
				>
					{settingData?.chose_us_two_heading}
				</motion.h1>

				<div className={style.chooseUs}>
					{companionsData?.map((data, i: number) => (
						<motion.div
							initial={{ opacity: 0 }}
							whileHover={{
								scale: 1.1,
								transition: { duration: 0.3 },
							}}
							whileTap={{ scale: 0.9 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: i * 0.12,
								},
							}}
							className={style.singleChoose}
							key={data.id}
						>
							<div className={style.singleChooseImages}>
								<Image
									className={style.singleChooseImg}
									src={chooseImg1}
									alt="Choose Us Images"
								/>
								<div className={style.singleChooseIcon}>
									<DynamicIcon
										icon={data?.icon}
										className="size-8 text-white"
									/>
								</div>
							</div>
							<h2 className={style.signleChooseHeader}>{data?.title}</h2>
							<p className={style.singleChooseParagraph}>{data.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ChooseUs;
