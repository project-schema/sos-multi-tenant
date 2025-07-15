import style from './style.module.css';
import RattingCardSD from './ratting-card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchData } from '@/components/actions/action';
import Loader from '@/components/ui/Loader/Loader';

function ServiceOfDetails({ data }: { data: any }) {
	const router = useRouter();
	const id = router.query?.id?.[0];

	const [rattingData, setRattingData] = useState<any>(null);
	const [ratting, setRatting] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [sortBy, setSortBy] = useState('');
	const [next, setNext] = useState<any>(null);
	// Function to fetch data for the current page.
	const fetchDataForPage = async () => {
		setIsLoading(true);
		// api/all-services?tags=Ipsum & category_id = 2 & type = [latest,best_selling,avg_rating,default] & search = ????..
		const api = `/api/services-rating/${id}?search=${sortBy}`;
		const data = await fetchData(api);
		setNext(null);
		setRattingData(data);
		setRatting(data?.message?.data);
		setIsLoading(false);
	};

	const fetchDataForNextPage = async () => {
		setIsLoading(true);
		// api/all-services?tags=Ipsum & category_id = 2 & type = [latest,best_selling,avg_rating,default] & search = ????..
		const api = `/api/services-rating/${id}?page=${next}`;
		const newServiceData = await fetchData(api);
		setRatting(() => [...ratting, ...newServiceData?.message?.data]);
		setRattingData(newServiceData);
		setIsLoading(false);
	};

	// Call fetchDataForPage when the component mounts or currentPage changes.
	useEffect(() => {
		fetchDataForPage();
	}, [sortBy]);
	useEffect(() => {
		if (next) {
			fetchDataForNextPage();
		}
	}, [next]);

	const handelNextPageUrl = (e: string) => {
		const nextPage = e.split('?page=')[1];
		setNext(nextPage);
	};
	return (
		<div className={style.servicesDetailsContent}>
			<motion.h3
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5,
					},
				}}
				className={style.sDetailsContentHeading}
			>
				Description
			</motion.h3>
			<motion.p
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5,
					},
				}}
				className={style.sDetailsParagraph}
			>
				{data?.description}
			</motion.p>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5,
					},
				}}
				className={style.userBorder}
			></motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						delay: 0.2,
						duration: 0.5,
					},
				}}
				className={style.userCategoryWP}
			>
				<div className={style.sUserCateItem}>
					<p className={style.sDetailsCategory}>Category</p>
					<p className={style.sDetailsCategoryHeadhing}>
						{data?.servicecategory?.name}
					</p>
				</div>
				<div className={style.sUserCateItem}>
					<p className={style.sDetailsCategory}>Sub Category</p>
					<p className={style.sDetailsCategoryHeadhing}>
						{data?.servicesubcategory?.name}
					</p>
				</div>
				{/* <div className={style.sUserCateItem}>
					<p className={style.sDetailsCategory}>Service Type</p>
					<p className={style.sDetailsCategoryHeadhing}>Smart Gadgets</p>
				</div> */}
			</motion.div>
			<div className={style.userReviewWPTop}>
				<div>
					<p className={style.reviewText}>Reviews</p>
				</div>
				<div className={style.userReviewItemWP}>
					<p className={style.sortText}>Sort By:</p>
					<select
						onChange={(e) => setSortBy(e.target.value)}
						className={style.userSelectBox}
						name="languages"
						id="lang"
					>
						<option className={style.selectBoxItem} value="">
							Most Recent
						</option>
						<option className={style.selectBoxItem} value="top_review">
							Top Review
						</option>
					</select>
				</div>
			</div>
			{ratting?.map((e: any, i: number) => (
				<RattingCardSD key={i} data={e} i={i} />
			))}
			{rattingData?.message?.next_page_url && (
				<div className="flex justify-center items-center">
					<button
						onClick={() =>
							handelNextPageUrl(rattingData?.message?.next_page_url)
						}
						disabled={isLoading}
						type="button"
						className="px-5 bg-blue-500 py-2 rounded text-white"
					>
						{isLoading ? <Loader /> : 'Load More +'}
					</button>
				</div>
			)}

			<p className="mt-20 mb-10 flex flex-wrap gap-2">
				<span className="text-blue-700 text-xl">Tags: </span>
				{data?.tags?.map((e: string, i: number) => (
					<span
						onClick={() => router.push(`/services?tags=${e}`)}
						key={i}
						className="bg-slate-600 text-white px-4 py-1 rounded cursor-pointer"
					>
						{e}
					</span>
				))}
			</p>
		</div>
	);
}

export default ServiceOfDetails;
