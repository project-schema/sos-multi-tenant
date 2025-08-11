import Image from 'next/image';
import Link from 'next/link';
import style from './AllServices.style.module.css';
import ClientMotionWrapper from './ClientMotionWrapper';

const staticServiceData = [
	{
		id: 1,
		image: '/placeholder.svg',
		title: 'Static Service Title 1',
		user: {
			name: 'John Doe',
			image: '/placeholder.svg',
		},
		servicerating_avg_rating: '4.5',
		firstpackage: {
			price: 1500,
		},
	},
	{
		id: 2,
		image: '/placeholder.svg',
		title:
			'Another Great Static Service With A Long Title That Will Be Trimmed',
		user: {
			name: 'Jane Smith',
			image: '/placeholder.svg',
		},
		servicerating_avg_rating: '4.8',
		firstpackage: {
			price: 2000,
		},
	},
	// Add more static services as needed
];

const AllServices = () => {
	return (
		<section className={style.servicesSection}>
			<div className="layout">
				<div className={style.serviceFilter}>
					<h2 className={style.serviceHeader}>Top List Of Services</h2>
					<div className={style.filterOption}>
						<p className={style.serviceLeftFilter}>Filter:</p>
						<select className={style.filterBySort} id="sortBy" disabled>
							<option className={style.values}>Sort by</option>
						</select>
						<select className={style.filterByCategory} id="categories" disabled>
							<option className={style.values}>Category</option>
						</select>
					</div>
				</div>

				<div className={style.services}>
					{staticServiceData.map((data, i) => (
						<ClientMotionWrapper key={data.id} index={i}>
							<div className={style.singleService}>
								<Link href={`/services/${data.id}`}>
									<Image
										className={style.serviceImage}
										src={`${data.image}`}
										alt="Service Image"
										width={312}
										height={200}
									/>
								</Link>
								<div className={style.serviceProviderInfo}>
									{data.user.image ? (
										<Image
											src={'/placeholder.svg'}
											alt="Service Provider Image"
											height={20}
											width={20}
										/>
									) : (
										<span />
									)}
									<p className={style.serviceProviderName}>{data.user.name}</p>
								</div>
								<Link href={`/services/${data.id}`}>
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
			</div>
		</section>
	);
};

export default AllServices;
