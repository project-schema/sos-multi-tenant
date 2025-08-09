'use client';
import ChooseUsCard from '@/components/frontend/Cards/ChooseUsCard';
import Heading from '@/components/frontend/Heading';
import { iSettingsType } from '@/types';
import { motion } from 'motion/react';
import style from './choose-us.module.css';

function ChooseUs({ settings }: { settings: iSettingsType }) {
	const data = settings?.message;

	return (
		<section className={style.chooseUs}>
			<div className="layout">
				<div className={style.chooseWrap}>
					<div className={style.choseUs__left}>
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
						>
							<Heading
								h1={data.chose_us_title}
								p={data.chose_us_heading}
								center="left"
							/>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 1,
									delay: 0.6,
								},
							}}
							viewport={{ once: true, amount: 0.2 }}
						>
							<p className={style.chooseSubTxt}>{data.chose_description}</p>
						</motion.div>

						{/* Progress Bars */}
						{[
							{
								title: data.progress_title,
								value: data.progress_value,
							},
							{
								title: data.progres_two_title,
								value: data.progres_two_value,
							},
							{
								title: data.progres_three_title,
								value: data.progres_three_value,
							},
							{
								title: data.progres_four_title,
								value: data.progres_four_value,
							},
						].map((item, index) => (
							<div key={index} className={style.progressSection}>
								<div className={style.progressbarWrap}>
									<p className={style.progressbar}>{item.title}</p>
									<p className={style.progressbarValue}>{item.value}%</p>
								</div>
								<div className="flex w-full h-3 bg-[#E3E3E3] rounded-full overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										whileInView={{
											width: `${item.value}%`,
											transition: {
												duration: 1,
												delay: 0.6,
											},
										}}
										viewport={{ once: true, amount: 0.2 }}
										className="flex flex-col justify-center overflow-hidden bg-gradient-to-r from-[#206bce] to-[#1A77F2]"
										role="progressbar"
										style={{ width: `${item.value}%` }}
										aria-valuenow={Number(item.value)}
										aria-valuemin={0}
										aria-valuemax={100}
									></motion.div>
								</div>
							</div>
						))}
					</div>

					<div className={style.choseUs__right}>
						<div className={style.cards}>
							<div className={style.cards_group}>
								{/* Card 1 */}
								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											duration: 1,
											delay: 0.2,
										},
									}}
									viewport={{ once: true, amount: 0.2 }}
								>
									<ChooseUsCard
										icon={data?.chose_card_one_icon}
										title={data?.chose_card_one_title}
										subtitle={data?.chose_card_one_description}
									/>
								</motion.div>

								{/* Card 2 */}
								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											duration: 1,
											delay: 0.3,
										},
									}}
									viewport={{ once: true, amount: 0.2 }}
								>
									<ChooseUsCard
										icon={data?.chose_card_two_icon}
										title={data?.chose_card_two_title}
										subtitle={data?.chose_card_two_description}
									/>
								</motion.div>
							</div>

							<div className={style.cards_group2}>
								{/* Card 3 */}
								<motion.div
									initial={{ opacity: 0 }}
									whileInView={{
										opacity: 1,
										transition: {
											duration: 1,
											delay: 0.4,
										},
									}}
									viewport={{ once: true, amount: 0.2 }}
								>
									<ChooseUsCard
										icon={data?.chose_card_three_icon}
										title={data?.chose_card_three_title}
										subtitle={data?.chose_card_three_description}
									/>
								</motion.div>

								{/* Card 4 */}
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
								>
									<ChooseUsCard
										icon={data?.chose_card_four_icon}
										title={data?.chose_card_four_title}
										subtitle={data?.chose_card_four_description}
									/>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ChooseUs;
