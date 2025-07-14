import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
	value: number;
	style: any; // Add your custom styling type here
}

const StarRating: React.FC<StarRatingProps> = ({ value, style }) => {
	const fullStars = Math.floor(value);
	const hasHalfStar = value - fullStars >= 0.5;

	const starIcons = [];

	for (let i = 1; i < fullStars; i++) {
		starIcons.push(<FaStar key={i} className={style} />);
	}

	if (hasHalfStar) {
		starIcons.push(<FaStarHalfAlt key="half" className={style} />);
	}

	return starIcons?.map((star, index) => <span key={index}>{star}</span>);
};

export default StarRating;
