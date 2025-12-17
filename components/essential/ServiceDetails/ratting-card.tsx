import { env, imageFormat } from '@/lib';
import { Star, StarHalf, StarOff } from 'lucide-react';
import Image from 'next/image';
import ClientMotionWrapper from './ClientMotionWrapper';
import style from './style.module.css';
import { iServiceRatingType } from './type';

type Props = {
	rating: iServiceRatingType;
};

function RattingCardSD({ rating }: Props) {
	const profileImage = rating?.user?.image
		? imageFormat(rating.user.image)
		: env.placeholderImage;
	const displayName =
		rating?.tenant?.company_name || rating?.user?.name || 'Unknown reviewer';
	const secondaryText = rating?.tenant
		? rating?.tenant?.owner_name || 'Tenant'
		: 'User';
	const reviewDate = rating?.created_at
		? new Date(rating.created_at).toLocaleDateString()
		: '';

	return (
		<ClientMotionWrapper delay={0.1}>
			<div className={style.userBorder}></div>
			<div className={style.userReviewWP}>
				<div className={style.reviewImgWidth}>
					<Image
						className={style.reviewUser}
						src={profileImage}
						width={100}
						height={100}
						alt={displayName}
					/>
				</div>
				<div className={style.reviewimgText}>
					<h3 className={style.userReviewH}>{displayName}</h3>
					<p className={style.userReviewP}>{secondaryText}</p>
					<div className={style.reviewUserDetails}>
						<div className={style.starts}>
							<RatingStars rating={rating?.rating || 0} />
						</div>
						{reviewDate && <p>{reviewDate}</p>}
					</div>
					<p className={style.reviewParagraph}>{rating?.comment}</p>
				</div>
			</div>
		</ClientMotionWrapper>
	);
}

export default RattingCardSD;

function RatingStars({ rating }: { rating: number }) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;
	const totalStars = 5;

	const stars = [];

	for (let i = 1; i <= totalStars; i++) {
		if (i <= fullStars) {
			stars.push(<Star key={i} size={16} fill="#facc15" color="#facc15" />);
		} else if (hasHalfStar && i === fullStars + 1) {
			stars.push(<StarHalf key={i} size={16} color="#facc15" />);
		} else {
			stars.push(<StarOff key={i} size={16} color="#d1d5db" />);
		}
	}

	return <div className={style.starts}>{stars}</div>;
}
