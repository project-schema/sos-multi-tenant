import Style from './SosAdvertise.style.module.css';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import { GridLoader } from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import Link from 'next/link';

function SosAdertise({ getSettingData }: any) {
	const settingData = getSettingData?.message;
	const [loading, setLoading] = useState(false);

	const [faqs, setFaq] = useState<any>(null);
	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const res = await fetchData('/api/faqs');
			setFaq(res);
			setLoading(false);
		};
		getData();
	}, []);

	const data = faqs?.message;

	return (
		<section className={Style.SosAdertiseSection}>
			<div className={'layout'}>
				<div className={Style.advertiseWrapper}>
					<div className={Style.advertiseLeftMenu}>
						<ul>
							<motion.li
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.12,
										duration: 0.3,
									},
								}}
								className={Style.active}
							>
								<a className={Style.adbtn} href="#overview">
									Overview
								</a>
							</motion.li>
							<motion.li
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.2,
										duration: 0.3,
									},
								}}
							>
								<a className={Style.adbtn} href="#getStarted">
									Get Started
								</a>
							</motion.li>
							<motion.li
								initial={{ y: 50, opacity: 0 }}
								whileInView={{
									y: 0,
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.3,
									},
								}}
							>
								<a className={Style.adbtn} href="#faq">
									FAQ
								</a>
							</motion.li>
						</ul>
					</div>
					<div className={Style.advertiseRightMenuDetails}>
						<div id="overview">
							<motion.button
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.5,
									},
								}}
								className={Style.advertiseButtonTop}
							>
								Overview
							</motion.button>
							<motion.h2
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.5,
									},
								}}
								className={`${Style.OverviewHeadingBox} mt-8`}
							>
								{settingData?.overview_title}
							</motion.h2>

							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.5,
									},
								}}
								className={`${Style.OverviewParagraph} !mt-10`}
							>
								{settingData?.overview_description}
							</motion.p>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.5,
									},
								}}
								className="mt-10"
							>
								<Link
									className={Style.overviewBoostButton}
									href={'/advertiserForm'}
								>
									Boost Now with SOS
								</Link>
							</motion.div>
						</div>

						<div id="getStarted">
							<motion.button
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.5,
									},
								}}
								className={Style.advertiseButton}
							>
								Get started
							</motion.button>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.2,
										duration: 0.5,
									},
								}}
								className={Style.getStarted}
							>
								<motion.h2
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											delay: 0.3,
											duration: 0.5,
										},
									}}
									className={Style.OverviewHeadingBox}
								>
									{settingData?.get_sarted_title}
								</motion.h2>
								<motion.p
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											delay: 0.3,
											duration: 0.5,
										},
									}}
									className={Style.OverviewParagraph}
								>
									{settingData?.get_sarted_description}
								</motion.p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.5,
									},
								}}
								className="mt-10"
							>
								<Link
									className={Style.overviewBoostButton}
									href={'/advertiserForm'}
								>
									Boost Now with SOS
								</Link>
							</motion.div>
						</div>
						<div id="faq">
							<motion.button
								initial={{ opacity: 0 }}
								whileInView={{
									opacity: 1,
									transition: {
										delay: 0.3,
										duration: 0.5,
									},
								}}
								className={Style.advertiseButton}
							>
								FAQ
							</motion.button>
							<div className={Style.faqMargin}>
								{loading ? (
									<GridLoader />
								) : (
									<div className="join  join-vertical w-full">
										{data?.map((singleData: any, i: number) => (
											<motion.div
												initial={{ opacity: 0, y: 100 }}
												whileInView={{
													opacity: 1,
													transition: {
														duration: 0.5,
														delay: i * 0.1,
													},
													y: 0,
												}}
												key={i}
												className={Style.faqItems}
											>
												<div className=" collapse collapse-arrow join-item bg-white p-1 mb-[16px]">
													<input type="radio" name="my-accordion-4" />
													<div className="collapse-title text-xl font-normal color[#666666]">
														{singleData?.heading}
													</div>
													<div className="collapse-content">
														<p>{singleData?.description}</p>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SosAdertise;
