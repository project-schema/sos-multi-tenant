import { Star, StarHalf, StarOff } from 'lucide-react';
import React from 'react';

interface StarRatingProps {
	value: number;
	style?: React.CSSProperties;
	max?: number; // Optional: default 5 stars
}

const StarRating: React.FC<StarRatingProps> = ({ value, style, max = 5 }) => {
	const fullStars = Math.floor(value);
	const hasHalfStar = value - fullStars >= 0.5;
	const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

	const stars = [];

	for (let i = 0; i < fullStars; i++) {
		stars.push(<Star key={`full-${i}`} style={style} fill="currentColor" />);
	}

	if (hasHalfStar) {
		stars.push(<StarHalf key="half" style={style} />);
	}

	for (let i = 0; i < emptyStars; i++) {
		stars.push(<StarOff key={`empty-${i}`} style={style} />);
	}

	return <div style={{ display: 'flex', gap: 4 }}>{stars}</div>;
};

export default StarRating;
