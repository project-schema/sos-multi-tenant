'use client';
import style from './services.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Heading from '@/components/frontend/Heading';
import yellow from './yellow.svg';
import { iServicesType, iSettingsType } from '@/types';

function Services({
	settingsData,
	getServiceData,
}: {
	settingsData: iSettingsType;
	getServiceData: iServicesType;
}) {
	const data = settingsData.message;
	const serviceData = getServiceData?.message;

	return (
		<div className={style.servicesWrap}>
			<div className="layout">
				<div className={style.services}>
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
						<Heading h1={data.service_one_title} p={data.service_one_heading} />
					</motion.div>

					<div className={style.cardWrap}>
						{serviceData?.map((singleData: any, i: number) => (
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										duration: 0.5,
										delay: 0.3 + i * 0.1,
									},
								}}
								viewport={{ once: true, amount: 0.2 }}
								className={style.card}
								key={i}
							>
								<div className={style.icon}>
									<div className={style.serviceCardImg}>
										<Image className={style.icon} alt="icon" src={yellow} />
										<div className={style.serviceOneIcon}>
											{/* <IconPickerItem
												size={40}
												icon={singleData?.icon}
												color="#fff"
											/> */}
										</div>
									</div>
								</div>
								<h1 className={style.heading}>{singleData.title}</h1>
								<p className={style.subheading}>{singleData.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Services;
