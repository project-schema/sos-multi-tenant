import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import style from "./FeedbackSlider.style.module.css";

const Rating = ({ rating }: any) => {
  const ratingStarts = Array.from({ length: 5 }, (element, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <FaStar className={style.feedbackIcons} />
        ) : rating >= number ? (
          <FaStarHalfAlt className={style.feedbackIcons} />
        ) : (
          <AiOutlineStar className={style.feedbackIcons} />
        )}
      </span>
    );
  });
  return <div className={style.feedbackRating}>{ratingStarts}</div>;
};

export default Rating;
