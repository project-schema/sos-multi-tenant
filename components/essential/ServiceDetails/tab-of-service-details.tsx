'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import style from './style.module.css';

export default function TabOfSD({ packages = [] as any[] }) {
	const [tab, setTab] = useState(0);

	const servicePackages = useMemo(() => packages, [packages]);

	console.log(servicePackages);
	console.log(packages);

	return (
		<div className={style.servicesDetailsTab}>
			<div className={style.tabTotalBox}>
				<div className={style.tabBox}>
					{servicePackages.map((_, idx) => (
						<Tab
							key={idx}
							text={['Basic', 'Standard', 'Premium'][idx] || `Pack ${idx + 1}`}
							tab={tab}
							value={idx}
							setTab={setTab}
						/>
					))}
				</div>
				{servicePackages
					.filter((_, i) => i === tab)
					.map((e) => (
						<div key={e.id} className={style.boxtab}>
							<div className={style.tabContentBox}>
								<motion.div
									initial={{ x: 50, opacity: 0 }}
									whileInView={{
										x: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.12,
										},
									}}
									className={style.tabDetail}
								>
									<h3 className={style.tabHeadign}>৳ {e.price}</h3>
								</motion.div>
								<motion.div
									initial={{ x: 50, opacity: 0 }}
									whileInView={{
										x: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.13,
										},
									}}
								>
									<p className={style.tabContentp}>{e.package_title}</p>
								</motion.div>
								<motion.div
									initial={{ x: 50, opacity: 0 }}
									whileInView={{
										x: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.14,
										},
									}}
									className={style.tabContentpt}
									dangerouslySetInnerHTML={{
										__html: e.package_description,
									}}
								></motion.div>

								<motion.div
									initial={{ x: 50, opacity: 0 }}
									whileInView={{
										x: 0,
										opacity: 1,
										transition: {
											duration: 0.3,
											delay: 0.15,
										},
									}}
									className={style.tabIcon}
								>
									<div>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM16.2 16.2L11 13V7H12.5V12.2L17 14.9L16.2 16.2Z"
												fill="#6A6A6A"
											/>
										</svg>
									</div>
									<div>
										<p>{e.time} Days Delivery</p>
										<p>{e.revision_max_time} Times Revision</p>
									</div>
								</motion.div>
								<div className={style.tabfullBtnb}>
									<Link
										href={`/services/${e.vendor_service_id}/pay?package_id=${e.id}&price=${e.price}`}
										className={style.tabBtn}
										prefetch={false}
									>
										<span className={style.btnText}>Buy now </span>
										<svg
											width="23"
											height="20"
											viewBox="0 0 23 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M21.8839 10.8839C22.372 10.3957 22.372 9.60427 21.8839 9.11612L13.9289 1.16117C13.4408 0.673011 12.6493 0.673011 12.1612 1.16117C11.673 1.64932 11.673 2.44078 12.1612 2.92893L19.2322 10L12.1612 17.0711C11.673 17.5592 11.673 18.3507 12.1612 18.8388C12.6493 19.327 13.4408 19.327 13.9289 18.8388L21.8839 10.8839ZM-1.09278e-07 11.25L21 11.25L21 8.75L1.09278e-07 8.75L-1.09278e-07 11.25Z"
												fill="#FAFAFA"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}

export const Tab = ({
	text,
	tab,
	setTab,
	value,
}: {
	text: string;
	tab: number;
	value: number;
	setTab: Function;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{
				opacity: 1,
				transition: {
					duration: 0.5,
					delay: 0.2,
				},
			}}
			onClick={() => setTab(value)}
			className={`${style.tabHeaderContent} ${
				tab === value ? style.active : ''
			}`}
		>
			{text}
		</motion.div>
	);
};
