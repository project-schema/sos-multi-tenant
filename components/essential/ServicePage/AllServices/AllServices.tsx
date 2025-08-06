import { BASE_URL } from '@/lib/env';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserAlt } from 'react-icons/fa';
import serviceProviderImg from '../../../../../public/images/serviceProviderImg.png';
import Pagination from '../../Pagination/Pagination';
import style from './AllServices.style.module.css';

const AllServices = ({
	getServiceData,
	serviceData,
	isLoading,
	page,
	search,
	sortBy,
	categoryId,
	getTags,
	tags,
	setPage,
	seCategoryId,
	setSortBy,
	setSearch,
	setTags,
	category,
}: any) => {
	const checkSearch = search || sortBy || categoryId || getTags || tags;
	const clearSearch = () => {
		setSearch('');
		setSortBy('');
		seCategoryId('');
		setTags('');
	};
	const content = (
		<div className={style.services}>
			{serviceData?.data?.map((data: any, i: number) => (
				<motion.div
					whileHover={{
						scale: 1.1,
						transition: { duration: 0.3 },
					}}
					initial={{ opacity: 0 }}
					whileInView={{
						opacity: 1,
						transition: {
							delay: i * 0.01,
							duration: 0.2,
						},
					}}
					className={style.singleService}
					key={data.id}
				>
					<Link href={`/service-details/${data?.id}`}>
						<Image
							className={style.serviceImage}
							src={`${BASE_URL}/${data?.image}`}
							alt="Service Image"
							width={312}
							height={200}
						/>
					</Link>
					<div className={style.serviceProviderInfo}>
						{data?.user?.image ? (
							<Image
								src={serviceProviderImg}
								alt="Service Provider Image"
								height={20}
								width={20}
							/>
						) : (
							<FaUserAlt className={style.userIcon} />
						)}
						<p className={style.serviceProviderName}>{data?.user?.name}</p>
					</div>
					<Link href={`/service-details/${data?.id}`}>
						<p className={style.serviceDetails}>
							{data?.title?.length > 80
								? data?.title?.slice(0, 80) + '...'
								: data?.title}
						</p>
					</Link>
					<div className={style.serviceRating}>
						{/* <StarRating
							style={style.ratingIcon}
							value={data?.servicerating_avg_rating}
						/> */}
						{parseFloat(data?.servicerating_avg_rating).toFixed(1)}
					</div>
					<h4 className={style.servicePrice}>
						Price {data?.firstpackage?.price} tk
					</h4>
				</motion.div>
			))}
		</div>
	);
	return (
		<section className={style.servicesSection}>
			<div className="layout">
				<div className={style.serviceFilter}>
					<motion.h2
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								delay: 0.25,
								duration: 0.5,
							},
						}}
						className={style.serviceHeader}
					>
						Top List Of Services{' '}
						{checkSearch && (
							<span
								className="text-sm bg-yellow-400 px-4 cursor-pointer py-1 rounded text-white"
								onClick={clearSearch}
							>
								Clear Search
							</span>
						)}
					</motion.h2>
					<div className={style.filterOption}>
						<p className={style.serviceLeftFilter}>Filter:</p>
						<select
							onChange={(e) => setSortBy(e.target.value)}
							className={style.filterBySort}
							id="sortBy"
						>
							{/* [latest,best_selling,avg_rating,default] */}
							<option className={style.values} value="default">
								Sort by
							</option>
							<option className={style.values} value="latest">
								Latest
							</option>
							<option className={style.values} value="avg_rating">
								Average Rating
							</option>
							<option className={style.values} value="best_selling">
								Best Selling
							</option>
						</select>
						<select
							className={style.filterByCategory}
							onChange={(e) => seCategoryId(e.target.value)}
							id="categories"
						>
							<option className={style.values} value="">
								Category
							</option>
							{category?.map((e: any) => (
								<option key={e?.id} className={style.values} value={e?.id}>
									{e?.name}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* {isLoading ? (
					<GridLoader />
				) : serviceData?.data?.length > 0 ? (
					content
				) : (
					<NotServiceFound
						backPage="/services"
						text="All Service"
						setPage={setPage}
						setSearch={setSearch}
						setSortBy={setSortBy}
						seCategoryId={seCategoryId}
						setTags={setTags}
					/>
				)} */}
				<div className="mt-20 ">
					<Pagination
						page={page}
						setPage={setPage}
						isLoading={isLoading}
						getPaginationData={serviceData}
					/>
				</div>
			</div>
		</section>
	);
};

export default AllServices;
