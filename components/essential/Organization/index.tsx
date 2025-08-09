'use client';

import Heading from '@/components/frontend/Heading';
import { YoutubeModal } from '@/components/frontend/modal';
import { env } from '@/lib';
import { iOrgOneType } from '@/types';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import check from './check-icon.svg';
import style from './Organization.module.css';
function Organization({
	settingsData,
	reverse = false,
	getOrgOneData,
}: {
	settingsData: any;
	reverse?: boolean;
	getOrgOneData: iOrgOneType;
}) {
	const [play, setPlay] = useState(false);
	const data = settingsData.message;

	const orgData = getOrgOneData?.message;

	return (
		<div className={style.org}>
			<div className="layout">
				<div className={`${style.orgWrap} ${reverse && 'flex-row-reverse'}`}>
					<div className={style.org__left}>
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: 0.2,
								},
							}}
						>
							<Heading
								h1={data.org_one_heading}
								p={data.org_one_title}
								center="left"
							/>
						</motion.div>
						<div className={style.orgRules}>
							{orgData?.map((singleData: any, i: number) => (
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
									className={style.rulesList}
									key={singleData.id}
								>
									<Image alt="icon" src={check} />
									<p className={style.ruleTxt}>{singleData.description}</p>
								</motion.div>
							))}
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{
								opacity: 1,
								transition: {
									duration: 0.5,
									delay: 0.2,
								},
							}}
							className={style.howItWork}
						>
							<label
								onClick={() => setPlay((e) => !e)}
								htmlFor="my_modal_6"
								style={{ cursor: 'pointer' }}
							>
								<BsFillPlayCircleFill className={style.playIcon} />
							</label>
							<p onClick={() => setPlay((e) => !e)} className={style.howIiTxt}>
								How It Works?
							</p>
						</motion.div>
						{play && (
							<YoutubeModal link={data?.org_one_video_link} setPlay={setPlay} />
						)}
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 1,
								delay: 0.5,
							},
						}}
						className={style.imgBox}
					>
						{data?.org_photo && (
							<Image
								alt="Company-img"
								src={`${env.baseAPI}/${data?.org_one_photo}`}
								width={588}
								height={552}
							/>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
}

export default Organization;
