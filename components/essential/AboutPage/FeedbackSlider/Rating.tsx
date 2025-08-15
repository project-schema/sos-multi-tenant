import style from './FeedbackSlider.style.module.css';

type RatingProps = {
	rating: number;
};

const Rating = ({ rating }: RatingProps) => {
	const ratingStarts = Array.from({ length: 5 }, (element, index) => {
		return <span key={index}>test</span>;
	});
	return <div className={style.feedbackRating}>{ratingStarts}</div>;
};

export default Rating;

//  {rating >= index + 1 ? (
//           // <FaStar className={style.feedbackIcons} />
//         ) : rating >= index + 0.5 ? (
//           // <FaStarHalfAlt className={style.feedbackIcons} />
//         ) : (
//           // <AiOutlineStar className={style.feedbackIcons} />
//         )}
