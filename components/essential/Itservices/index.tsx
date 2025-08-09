'use client';

import Heading from '@/components/frontend/Heading';
import { DynamicIcon } from '@/lib/icon/dynamic-icon';
import { iItServicesType, iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import blue from './blue.svg';
import style from './itService.module.css';

function ItServices({
	settings,
	itServices,
}: {
	settings: iSettingsType;
	itServices: iItServicesType;
}) {
	const data = settings?.message;
	const itService = itServices?.message;

	return (
		<section className={style.itService}>
			<div className="layout">
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
					<Heading
						h1={data.service_two_title}
						p={data.service_two_heading}
						center="center"
					/>
				</motion.div>

				<div className={style.ServicesCardWrap}>
					{itService?.map((singleData: any, i: number) => (
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: 0.2 + i * 0.1,
								},
							}}
							viewport={{ once: true, amount: 0.2 }}
							className={style.wrap}
							key={singleData.id || i}
						>
							<div className={style.icon}>
								<Image alt="icon" src={blue} className={style.ico} />
								<div className={style.serviceIcon}>
									<DynamicIcon icon={singleData?.icon} className="size-8" />
								</div>
							</div>
							<h1 className={style.text}>{singleData.title}</h1>
							<p className={style.paragraph}>{singleData.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default ItServices;
