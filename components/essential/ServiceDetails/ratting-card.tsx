import { Star, StarHalf, StarOff } from 'lucide-react';
import Image from 'next/image';
import ClientMotionWrapper from './ClientMotionWrapper';
import style from './style.module.css';

// Static version of the component
function RattingCardSD() {
	const mockData = {
		user: {
			name: 'John Doe',
			email: 'john@example.com',
			image: '/placeholder.svg',
		},
		rating: 4.5,
		comment:
			'Excellent service! Very professional and friendly. Would highly recommend.',
		created_at: '2025-08-11',
	};

	return (
		<ClientMotionWrapper delay={0.1}>
			<div className={style.userBorder}></div>
			<div className={style.userReviewWP}>
				<div className={style.reviewImgWidth}>
					<Image
						className={style.reviewUser}
						src={mockData.user.image}
						width={100}
						height={100}
						alt="User Image"
					/>
				</div>
				<div className={style.reviewimgText}>
					<h3 className={style.userReviewH}>{mockData.user.name}</h3>
					<p className={style.userReviewP}>{mockData.user.email}</p>
					<div className={style.reviewUserDetails}>
						<div className={style.starts}>
							<RatingStars rating={mockData.rating} />
						</div>
						<p>2 days ago</p>
					</div>
					<p className={style.reviewParagraph}>{mockData.comment}</p>
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
