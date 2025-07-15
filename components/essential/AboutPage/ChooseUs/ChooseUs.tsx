import style from './ChooseUs.style.module.css';
import Image from 'next/image';
import chooseImg1 from '../../../../../public/images/chooseimg1.png';
import { IconPickerItem } from 'react-fa-icon-picker';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import { motion } from 'framer-motion';
import { GridLoader } from '@/components/ui/Loader';

const ChooseUs = ({ getSettingsData }: any) => {
	const settingData = getSettingsData.message;

	const [getCompanionsData, setCompanionsData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const getData = async () => {
			const res = await fetchData('/api/companions');
			setCompanionsData(res);
			setLoading(false);
		};
		getData();
	}, []);
	const companionsData = getCompanionsData?.message;

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
				{loading ? (
					<GridLoader />
				) : (
					<div className={style.chooseUs}>
						{companionsData?.map((data: any, i: number) => (
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
										<IconPickerItem
											icon={data?.icon}
											size={40}
											color="#FAFAFA"
										/>{' '}
									</div>
								</div>
								<h2 className={style.signleChooseHeader}>{data?.title}</h2>
								<p className={style.singleChooseParagraph}>
									{data.description}
								</p>
							</motion.div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default ChooseUs;
