import { BASE_URL } from '@/lib/env';
import style from './OurMission.style.module.css';
import Image from 'next/image';
import { IconPickerItem } from 'react-fa-icon-picker';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import { ImageList } from '@/components/ui/Loader';
import { motion } from 'framer-motion';

const OurMission = ({ getSettingsData }: any) => {
	const data = getSettingsData.message;
	const [getMissionData, setGetMissionData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const getData = async () => {
			const res = await fetchData('/api/missions');
			setGetMissionData(res);
			setLoading(false);
		};
		getData();
	}, []);
	const ourMissions = getMissionData?.message;

	return (
		<section className={style.ourMission}>
			<div className="layout">
				<div className={style.mission}>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.2,
							},
						}}
						className={style.leftImg}
					>
						<Image
							src={`${BASE_URL}/${data.mission_image}`}
							alt="Missin Image"
							width={530}
							height={500}
						/>
					</motion.div>
					<div className={style.rightContent}>
						<motion.h4
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: 0.2,
								},
							}}
							className={style.missionTopHeader}
						>
							{data.mission_title}
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
							className={style.missionHeader}
						>
							{data.mission_heading}
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
							className={style.missionParagraph}
						>
							{data.mission_description}
						</motion.p>
						<div className={style.missionFooter}>
							{loading ? (
								<ImageList />
							) : (
								ourMissions?.map((singleData: any, i: number) => (
									<motion.div
										initial={{ opacity: 0 }}
										whileInView={{
											opacity: 1,
											transition: {
												duration: 0.5,
												delay: i * 0.1,
											},
										}}
										className={style.missionFooterContent}
										key={singleData?.id}
									>
										<IconPickerItem
											icon={singleData?.icon_class}
											size={28}
											color="#1A77F2"
										/>
										<span className={style.footerContent}>
											{singleData.title}
										</span>
									</motion.div>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurMission;
