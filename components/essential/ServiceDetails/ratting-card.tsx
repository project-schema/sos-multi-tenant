import Image from 'next/image';
import style from './style.module.css';
import { BASE_URL } from '@/lib/env';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { timeToCovertCurrentTime } from '@/components/actions/action';
import { userIcon } from '@/lib/img';

function RattingCardSD({ data, i }: { data: any; i: number }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{
				opacity: 1,
				transition: {
					duration: 0.2,
					delay: i * 0.01,
				},
			}}
		>
			<div className={style.userBorder}></div>
			<div className={style.userReviewWP}>
				<div className={style.reviewImgWidth}>
					<Image
						className={style.reviewUser}
						src={
							data?.user.image ? BASE_URL + '/' + data?.user.image : userIcon
						}
						width={100}
						height={100}
						alt="Choose Us Images"
					/>
				</div>
				<div className={style.reviewimgText}>
					<h3 className={style.userReviewH}>{data.user.name}</h3>
					<p className={style.userReviewP}>{data.user.email}</p>
					<div className={style.reviewUserDetails}>
						<div className={style.starts}>
							<RatingStars rating={data.rating} />
						</div>
						<p>
							|{' '}
							{timeToCovertCurrentTime(data.created_at) === 'just now'
								? 'just now'
								: timeToCovertCurrentTime(data.created_at) + ' ago'}
						</p>
					</div>
					<p className={style.reviewParagraph}>{data.comment}</p>
				</div>
			</div>
		</motion.div>
	);
}

export default RattingCardSD;

export function RatingStars({ rating }: { rating: number }) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating - fullStars >= 0.5;
	const totalStars = 5;

	const stars = [];
	for (let i = 1; i <= totalStars; i++) {
		if (i <= fullStars) {
			stars.push(<BsStarFill key={i} />);
		} else if (hasHalfStar && i === fullStars + 1) {
			stars.push(<BsStarHalf key={i} />);
		} else {
			stars.push(<BsStar key={i} />);
		}
	}

	return (
		<div className={style.starts}>
			{stars.map((star, index) => (
				<span key={index}>{star}</span>
			))}
		</div>
	);
}
