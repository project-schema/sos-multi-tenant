import { env, imageFormat } from '@/lib';
import { iPagination, iServiceType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import style from './AllServices.style.module.css';
import ClientMotionWrapper from './ClientMotionWrapper';
// @ts-ignore
import Filters from './Filters';

type Category = { id: number; name: string; slug: string; status: string };

const AllServices = ({
	services,
	categories = [],
	current,
}: {
	services?: iPagination<iServiceType> | null;
	categories?: Category[];
	current?: {
		page?: string;
		category_id?: string;
		type?: string;
		search?: string;
		tags?: string;
	};
}) => {
	const data = services?.data || [];
	return (
		<section className={style.servicesSection}>
			<div className="layout">
				<div className={style.serviceFilter}>
					<h2 className={style.serviceHeader}>Top List Of Services</h2>
					<Filters categories={categories} current={current} />
				</div>

				<div className={style.services}>
					{data?.map((data, i) => (
						<ClientMotionWrapper key={data.id} index={i}>
							<div className={style.singleService}>
								<Link href={`/services/${data.id}/view`}>
									<img
										className={style.serviceImage}
										src={imageFormat(data.image)}
										alt="Service Image"
										width={312}
										height={200}
									/>
								</Link>
								<div className={style.serviceProviderInfo}>
									<Image
										src={env.placeholderImage}
										alt="Service Provider Image"
										height={20}
										width={20}
									/>

									<p className={style.serviceProviderName}>
										{data?.tenant?.company_name}
									</p>
								</div>
								<Link href={`/services/${data.id}/view`}>
									<p className={style.serviceDetails}>
										{data.title.length > 80
											? data.title.slice(0, 80) + '...'
											: data.title}
									</p>
								</Link>
								<div className={style.serviceRating}>
									{parseFloat(data.servicerating_avg_rating).toFixed(1)}
								</div>
								<h4 className={style.servicePrice}>
									Price {data.firstpackage.price} tk
								</h4>
							</div>
						</ClientMotionWrapper>
					))}
				</div>

				{services && services.total > services.per_page && (
					<div className="mt-10 flex items-center justify-center gap-2">
						{services.current_page > 1 && (
							<Link
								className="px-3 py-2 border rounded"
								href={`?page=${services.current_page - 1}`}
							>
								Prev
							</Link>
						)}
						{Array.from({ length: services.last_page }).map((_, idx) => {
							const page = idx + 1;
							const active = page === services.current_page;
							return (
								<Link
									key={page}
									className={`px-3 py-2 border rounded ${
										active ? 'bg-black text-white' : ''
									}`}
									href={`?page=${page}`}
								>
									{page}
								</Link>
							);
						})}
						{services.current_page < services.last_page && (
							<Link
								className="px-3 py-2 border rounded"
								href={`?page=${services.current_page + 1}`}
							>
								Next
							</Link>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default AllServices;
