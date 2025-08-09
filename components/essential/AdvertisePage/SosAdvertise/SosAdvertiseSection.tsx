'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { iFaqsType, iSettingsType } from '@/types';
import { motion } from 'motion/react';
import Link from 'next/link';
import Style from './SosAdvertise.style.module.css';

function SosAdvertise({
	settings,
	faqs,
}: {
	settings: iSettingsType;
	faqs: iFaqsType;
}) {
	const settingData = settings?.message;
	const data = faqs?.message;

	const fadeIn = (delay = 0.2) => ({
		hidden: { opacity: 0, y: 50 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, delay },
		},
	});

	console.log({ data });

	return (
		<section className={Style.SosAdertiseSection}>
			<div className="layout">
				<div className={Style.advertiseWrapper}>
					<div className={Style.advertiseLeftMenu}>
						<ul>
							{['Overview', 'Get Started', 'FAQ'].map((item, index) => (
								<motion.li
									key={item}
									variants={fadeIn(0.1 + index * 0.1)}
									initial="hidden"
									whileInView="show"
									viewport={{ once: true }}
									className={Style.active}
								>
									<a
										className={Style.adbtn}
										href={`#${item.replace(' ', '').toLowerCase()}`}
									>
										{item}
									</a>
								</motion.li>
							))}
						</ul>
					</div>

					<div className={Style.advertiseRightMenuDetails}>
						{/* Overview */}
						<div id="overview">
							<motion.button
								variants={fadeIn(0.3)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className={Style.advertiseButtonTop}
							>
								Overview
							</motion.button>

							<motion.h2
								variants={fadeIn(0.4)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className={`${Style.OverviewHeadingBox} mt-8`}
							>
								{settingData?.overview_title}
							</motion.h2>

							<motion.p
								variants={fadeIn(0.5)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className={`${Style.OverviewParagraph} !mt-10`}
							>
								{settingData?.overview_description}
							</motion.p>

							<motion.div
								variants={fadeIn(0.6)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className="mt-10"
							>
								<Link
									className={Style.overviewBoostButton}
									href="/advertiserForm"
								>
									Boost Now with SOS
								</Link>
							</motion.div>
						</div>

						{/* Get Started */}
						<div id="getstarted">
							<motion.button
								variants={fadeIn(0.3)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className={Style.advertiseButton}
							>
								Get started
							</motion.button>

							<motion.div
								variants={fadeIn(0.4)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className={Style.getStarted}
							>
								<motion.h2
									variants={fadeIn(0.5)}
									initial="hidden"
									whileInView="show"
									viewport={{ once: true }}
									className={Style.OverviewHeadingBox}
								>
									{settingData?.get_sarted_title}
								</motion.h2>

								<motion.p
									variants={fadeIn(0.6)}
									initial="hidden"
									whileInView="show"
									viewport={{ once: true }}
									className={Style.OverviewParagraph}
								>
									{settingData?.get_sarted_description}
								</motion.p>
							</motion.div>

							<motion.div
								variants={fadeIn(0.7)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className="mt-10"
							>
								<Link
									className={Style.overviewBoostButton}
									href="/advertiserForm"
								>
									Boost Now with SOS
								</Link>
							</motion.div>
						</div>

						{/* FAQ */}
						<div id="faq">
							<motion.button
								variants={fadeIn(0.3)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className={Style.advertiseButton}
							>
								FAQ
							</motion.button>

							<div className={Style.faqMargin}>
								<Accordion type="single" collapsible className="w-full">
									{data?.map((item, i) => (
										<motion.div
											key={i}
											variants={fadeIn(0.4 + i * 0.1)}
											initial="hidden"
											whileInView="show"
											viewport={{ once: true }}
											className={Style.faqItems}
										>
											<AccordionItem value={`item-${i}`}>
												<AccordionTrigger>{item.heading}</AccordionTrigger>
												<AccordionContent>{item.description}</AccordionContent>
											</AccordionItem>
										</motion.div>
									))}
								</Accordion>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SosAdvertise;
