import ClientMotionWrapper from './ClientMotionWrapper';
import RattingCardSD from './ratting-card';
import style from './style.module.css';

const mockData = {
	description:
		'This is a static description of the service. It provides insights about the offering, benefits, and other useful information for customers.',
	servicecategory: { name: 'Design' },
	servicesubcategory: { name: 'Logo Design' },
	tags: ['Creative', 'Professional', 'Affordable'],
};

const mockReviews = [
	{ user: 'John', rating: 5, comment: 'Great service!' },
	{ user: 'Jane', rating: 4, comment: 'Very satisfied!' },
];

function ServiceOfDetails() {
	return (
		<div className={style.servicesDetailsContent}>
			<ClientMotionWrapper>
				<h3 className={style.sDetailsContentHeading}>Description</h3>
			</ClientMotionWrapper>

			<ClientMotionWrapper>
				<p className={style.sDetailsParagraph}>{mockData.description}</p>
			</ClientMotionWrapper>

			<ClientMotionWrapper>
				<div className={style.userBorder}></div>
			</ClientMotionWrapper>

			<ClientMotionWrapper>
				<div className={style.userCategoryWP}>
					<div className={style.sUserCateItem}>
						<p className={style.sDetailsCategory}>Category</p>
						<p className={style.sDetailsCategoryHeadhing}>
							{mockData.servicecategory.name}
						</p>
					</div>
					<div className={style.sUserCateItem}>
						<p className={style.sDetailsCategory}>Sub Category</p>
						<p className={style.sDetailsCategoryHeadhing}>
							{mockData.servicesubcategory.name}
						</p>
					</div>
				</div>
			</ClientMotionWrapper>

			<div className={style.userReviewWPTop}>
				<div>
					<p className={style.reviewText}>Reviews</p>
				</div>
				<div className={style.userReviewItemWP}>
					<p className={style.sortText}>Sort By:</p>
					<select className={style.userSelectBox}>
						<option className={style.selectBoxItem} value="">
							Most Recent
						</option>
						<option className={style.selectBoxItem} value="top_review">
							Top Review
						</option>
					</select>
				</div>
			</div>

			{/* Static Reviews */}
			{mockReviews.map((e, i) => (
				<RattingCardSD key={i} data={e} i={i} />
			))}

			{/* Tags */}
			<p className="mt-20 mb-10 flex flex-wrap gap-2">
				<span className="text-blue-700 text-xl">Tags: </span>
				{mockData.tags.map((tag, i) => (
					<span
						key={i}
						className="bg-slate-600 text-white px-4 py-1 rounded cursor-pointer"
					>
						{tag}
					</span>
				))}
			</p>
		</div>
	);
}

export default ServiceOfDetails;
