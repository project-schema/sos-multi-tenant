import { BASE_URL } from '@/lib/env';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { HiLocationMarker, HiMail } from 'react-icons/hi';
import style from './Contact.style.module.css';

const ContactContent = ({ data }: any) => {
	const [mediaLink, setMediaLink] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(BASE_URL + '/api/footer-medias');
			const data = await response.json();
			setMediaLink(data?.message);
		};
		fetchData();
	}, []);
	return (
		<div className={style.leftContent}>
			<motion.h2
				initial={{ y: 50, opacity: 0 }}
				whileInView={{
					y: 0,
					opacity: 1,
					transition: {
						delay: 0.12,
						duration: 0.3,
					},
				}}
				className={style.leftHeader}
			>
				{data?.title}
			</motion.h2>
			<motion.p
				initial={{ y: 50, opacity: 0 }}
				whileInView={{
					y: 0,
					opacity: 1,
					transition: {
						delay: 0.14,
						duration: 0.3,
					},
				}}
				className={style.leftParagraph}
			>
				{data?.description}
			</motion.p>
			<div className={style.contactInfo}>
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					whileInView={{
						y: 0,
						opacity: 1,
						transition: {
							delay: 0.16,
							duration: 0.3,
						},
					}}
					className={style.flexColumn}
				>
					<FaPhone className={style.contactInfoIcon} />
					<span className={style.contactDetails}>{data?.phone}</span>
				</motion.div>
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					whileInView={{
						y: 0,
						opacity: 1,
						transition: {
							delay: 0.18,
							duration: 0.3,
						},
					}}
					id={style.extraGap}
					className={style.flexColumn}
				>
					<HiMail className={style.contactInfoIcon} />
					<span className={style.contactDetails}>{data?.email}</span>
				</motion.div>
				<motion.div
					initial={{ y: 50, opacity: 0 }}
					whileInView={{
						y: 0,
						opacity: 1,
						transition: {
							delay: 0.2,
							duration: 0.3,
						},
					}}
					className={style.flexColumn}
				>
					<HiLocationMarker className={style.contactInfoIcon} />
					<span className={style.contactDetails}>{data?.address}</span>
				</motion.div>
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.14,
						duration: 0.3,
					},
				}}
				className={style.socialInfo}
			>
				{mediaLink?.map((data: any, i) => (
					<div key={i}>
						<a href={data?.media_link} target="_black">
							{/* <IconPickerItem
								icon={data?.icon_class}
								size={30}
								color="#fafafa"
								className={style.socialIcon}
							/> */}
						</a>
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default ContactContent;
