import { BASE_URL } from '@/lib/env';
import style from './OurCompany.style.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';

const OurCompany = ({ getSettingsData }: any) => {
	const companyData = getSettingsData.message;

	return (
		<section className={style.ourCompany}>
			<div className="layout">
				<div className={style.company}>
					<div className={style.leftContent}>
						<motion.h5
							initial={{ y: 100, opacity: 0 }}
							whileInView={{
								y: 0,
								opacity: 1,
								transition: {
									delay: 0.2,
									duration: 0.5,
								},
							}}
							className={style.companyTopHeader}
						>
							{companyData.about_banner_title}
						</motion.h5>
						<motion.h1
							initial={{ y: 100, opacity: 0 }}
							whileInView={{
								y: 0,
								opacity: 1,
								transition: {
									delay: 0.3,
									duration: 0.5,
								},
							}}
							className={style.companyHeader}
						>
							{companyData.about_banner_heading}
						</motion.h1>
						<motion.p
							initial={{ y: 100, opacity: 0 }}
							whileInView={{
								y: 0,
								opacity: 1,
								transition: {
									delay: 0.4,
									duration: 0.5,
								},
							}}
							className={style.companyParagraph}
						>
							{companyData.about_banner_description}
						</motion.p>
						{/* <p id={style.anotherGap} className={style.companyParagraph}>
							{companyData.about_banner_descriptionTwo}
						</p> */}
						<div className={style.companyFooter}>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										duration: 0.5,
										delay: 0.6,
									},
								}}
								className={style.flexColumn}
							>
								<h2 className={style.companyExperience}>
									{companyData.about_banner_increment_one_count}
								</h2>
								<p className={style.companyExperienceType}>
									{companyData.about_banner_increment_one_title}
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										duration: 0.5,
										delay: 0.6,
									},
								}}
								className={style.flexColumn}
							>
								<h2 className={style.companyExperience}>
									{companyData.about_banner_increment_two_count}
								</h2>
								<p className={style.companyExperienceType}>
									{companyData.about_banner_increment_otwo_title}
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										duration: 0.5,
										delay: 0.6,
									},
								}}
								className={style.flexColumn}
							>
								<h2 className={style.companyExperience}>
									{companyData.about_banner_increment_othree_count}
								</h2>
								<p className={style.companyExperienceType}>
									{companyData.about_banner_increment_three_title}
								</p>
							</motion.div>
						</div>
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.3,
							},
						}}
						className={style.rightImg}
					>
						<Image
							alt="Company-img"
							src={`${BASE_URL}/${companyData?.about_banner_image}`}
							width={532}
							height={550}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default OurCompany;
