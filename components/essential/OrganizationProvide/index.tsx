'use client';
import Heading from '@/components/frontend/Heading';
import { BASE_URL, env } from '@/lib/env';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { iOrgTwoType, iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import style from './Organization.module.css';

function OrganizationProvide({
	settings,
	getOrTwoData,
}: {
	settings: iSettingsType;
	getOrTwoData: iOrgTwoType;
}) {
	const data = settings.message;
	const imgUrl = BASE_URL;

	return (
		<div className={style.org}>
			<div className="layout">
				<div className={`${style.orgWrap} flex-row-reverse`}>
					<div className={style.org__left}>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: 0.2,
								},
							}}
							viewport={{ once: true, amount: 0.2 }}
						>
							<Heading h1={data.org_title} p={data.org_heading} center="left" />
						</motion.div>

						<div className={style.orgItems}>
							{getOrTwoData?.message?.map((singleData: any, i: number) => (
								<motion.div
									initial={{ opacity: 0, y: 100 }}
									whileInView={{
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											delay: i * 0.1,
										},
									}}
									viewport={{ once: true, amount: 0.2 }}
									className={style.orgItem}
									key={singleData.id || i}
								>
									<div className={style.icoBox}>
										{/* <IconPickerItem
											icon={singleData?.icon}
											size={40}
											color="#1A77F2"
										/> */}
										<DynamicIcon icon={singleData?.icon} className="size-8" />
									</div>
									<div className={style.contents}>
										<h1 className={style.heading}>{singleData.title}</h1>
										<p className={style.subHeading}>{singleData.description}</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 1,
								delay: 0.5,
							},
						}}
						viewport={{ once: true, amount: 0.2 }}
						className={style.imgBox}
					>
						{data?.org_one_photo && (
							<Image
								alt="Company-img"
								src={`${env.baseAPI}/${data?.org_one_photo}`}
								width={588}
								height={552}
							/>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default OrganizationProvide;
