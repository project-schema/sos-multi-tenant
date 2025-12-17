import ClientMotionWrapper from './ClientMotionWrapper';
import ServiceRatting from './service-ratting';
import style from './style.module.css';

export default function ServiceOfDetails({ service }: { service: any }) {
	const tags: string[] = Array.isArray(service?.tags) ? service.tags : [];
	return (
		<div className={style.servicesDetailsContent}>
			<ClientMotionWrapper>
				<h3 className={style.sDetailsContentHeading}>Description</h3>
			</ClientMotionWrapper>

			<ClientMotionWrapper>
				<p className={style.sDetailsParagraph}>{service?.description}</p>
			</ClientMotionWrapper>

			<ClientMotionWrapper>
				<div className={style.userBorder}></div>
			</ClientMotionWrapper>

			<ClientMotionWrapper>
				<div className={style.userCategoryWP}>
					<div className={style.sUserCateItem}>
						<p className={style.sDetailsCategory}>Category</p>
						<p className={style.sDetailsCategoryHeadhing}>
							{service?.servicecategory?.name || '--'}
						</p>
					</div>
					<div className={style.sUserCateItem}>
						<p className={style.sDetailsCategory}>Sub Category</p>
						<p className={style.sDetailsCategoryHeadhing}>
							{service?.servicesubcategory?.name || '--'}
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
			<ServiceRatting service={service} />

			<p className="mt-20 mb-10 flex flex-wrap gap-2">
				<span className="text-blue-700 text-xl">Tags: </span>
				{tags.map((tag, i) => (
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
