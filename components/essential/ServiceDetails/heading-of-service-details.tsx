import { motion } from 'motion/react';
import Image from 'next/image';
import UserImg from 'public/images/sDetailsUser.png';
import { FaUserAlt } from 'react-icons/fa';
import style from './style.module.css';

function HeadingOfSD({ data }: { data: any }) {
	return (
		<div>
			<motion.h2
				initial={{ y: 50, opacity: 0 }}
				whileInView={{
					y: 0,
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5,
					},
				}}
				className={style.sDetailsHeading}
			>
				{data?.title}
			</motion.h2>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.25,
						duration: 0.5,
					},
				}}
				className={style.userDetails}
			>
				<div>
					{data?.user?.image ? (
						<Image
							className={style.sDetailsUserImg}
							src={UserImg}
							alt="Choose Us Images"
						/>
					) : (
						<FaUserAlt className={style.userIcon} />
					)}
				</div>
				<div>
					<p className={style.userName}>
						{data?.user?.name}
						{/* <span className={style.userSpan}>@jahidrifat</span> */}
					</p>
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5,
					},
				}}
				className={style.userBorder}
			></motion.div>
		</div>
	);
}

export default HeadingOfSD;
