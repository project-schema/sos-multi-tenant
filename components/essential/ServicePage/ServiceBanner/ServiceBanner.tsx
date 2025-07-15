import style from './ServiceBanner.style.module.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
const ServiceBanner = ({ getSettingsData, searchHandler, setPage }: any) => {
	const serviceData = getSettingsData?.message;
	const [value, setValue] = useState<any>(null);
	const data = {
		id: 1,
		header: 'Our Services',
		paragraph:
			'We offer a variety of services to help brands and merchants grow their businesses through affiliate marketing. These services include',
		footerData: [
			{
				name: 'Marketing Analysis',
			},
			{
				name: 'Graphic Design',
			},
			{
				name: 'Web Development',
			},
		],
	};
	const handelSearchTag = (e: string) => {
		setValue(e);
		searchHandler(e);
	};
	return (
		<section className={style.bannerSection}>
			<div className="layout">
				<div className={style.banner}>
					<motion.h1
						initial={{ y: 50, opacity: 0 }}
						whileInView={{
							y: 0,
							opacity: 1,
							transition: {
								delay: 0.2,
								duration: 0.5,
							},
						}}
						id="our-service"
						className={style.bannerHeader}
					>
						{serviceData?.service_banner_heading}
					</motion.h1>
					<motion.p
						initial={{ y: 50, opacity: 0 }}
						whileInView={{
							y: 0,
							opacity: 1,
							transition: {
								delay: 0.3,
								duration: 0.5,
							},
						}}
						className={style.bannerParagraph}
					>
						{serviceData?.service_banner_description}
					</motion.p>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								delay: 0.4,
								duration: 0.5,
							},
						}}
						className={style.inputSection}
					>
						<div className="w-full relative">
							<input
								className={style.inputField}
								type="text"
								name=""
								id=""
								value={value}
								onChange={(e) => handelSearchTag(e.target.value)}
								placeholder="Search your service"
							/>
							<FaSearch className={style.searchIcon} />
							{value && (
								<div
									onClick={() => {
										handelSearchTag('');
										setPage('');
									}}
									className="right-0 text-red-600 cursor-pointer"
								>
									<FaTimes className={`absolute right-4 top-[15px] `} />
								</div>
							)}
						</div>

						<button className={style.button}>
							<span className={style.buttonValue}>Search</span>
						</button>
					</motion.div>

					<div className={style.footerSection}>
						<motion.div
							initial={{ x: 10, opacity: 0 }}
							whileInView={{
								x: -10,
								opacity: 1,
								transition: {
									delay: 0.2,
									duration: 0.5,
								},
							}}
							className={style.footer}
						>
							<p className={style.footerContent}>Popular Searched:</p>
						</motion.div>
						{data?.footerData.map((singleData, i) => (
							<motion.div
								onClick={() => handelSearchTag(singleData.name)}
								initial={{ x: i + 10, opacity: 0 }}
								whileInView={{
									x: i - 10,
									opacity: 1,
									transition: {
										delay: 0.2,
										duration: 0.5,
									},
								}}
								key={i}
								className={style.footer}
							>
								<p className={style.footerContent}>{singleData.name}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ServiceBanner;
