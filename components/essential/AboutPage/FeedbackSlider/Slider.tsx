import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { BASE_URL } from '@/lib/env';

const Slider = ({ getTestimonialsData }: any) => {
	const data = getTestimonialsData.message;
	const imgUrl = BASE_URL;
	const settings = {
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: false,
		centerMode: true,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 752,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div>
			{/* <Slider {...settings}>
        {data.map((singleData: any) => (
          <>
            <div className={style.singleFeedback} key={singleData.id}>
              <div className={style.feedbackComma}>
                <svg
                  className={style.feedbackIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M13.5 7.5a3.5 3.5 0 1 0-1.876 3.101c-.234.868-.564 1.595-.959 2.175C9.875 13.938 8.84 14.5 7.75 14.5a.75.75 0 0 0 0 1.5c1.671 0 3.137-.883 4.156-2.38c1.01-1.486 1.594-3.583 1.594-6.12Z"
                  />
                </svg>
                <svg
                  className={style.secondFeedbackIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M13.5 7.5a3.5 3.5 0 1 0-1.876 3.101c-.234.868-.564 1.595-.959 2.175C9.875 13.938 8.84 14.5 7.75 14.5a.75.75 0 0 0 0 1.5c1.671 0 3.137-.883 4.156-2.38c1.01-1.486 1.594-3.583 1.594-6.12Z"
                  />
                </svg>
              </div>
              <p className={style.feedbackParagraph}>
                {singleData.description}
              </p>
              <div className={style.feedbackPersonInfo}>
                <div className={style.feedbackPersonDetails}>
                  <Image src={feedbackPerson} alt="Feedback Person" />
                  <div>
                    <h5 className={style.feedbackPersonName}>
                      {singleData.name}
                    </h5>
                    <p className={style.feedbackPersonPosition}>
                      {singleData.designation}
                    </p>
                  </div>
                </div>
                <div className={style.feedbackRating}>
                  <FaStar className={style.feedbackIcons} />
                  <FaStar className={style.feedbackIcons} />
                  <FaStar className={style.feedbackIcons} />
                  <FaStar className={style.feedbackIcons} />
                  <FaStar className={style.feedbackIcons} />
                </div>
              </div>
            </div>
          </>
        ))}
      </Slider> */}
		</div>
	);
};

export default Slider;
