import { ICON, shape } from '@/lib/img';
import style from './PricingCard.module.css';
import Image from 'next/image';
import { USER } from '@/all-api/auth-headers';
import { useRouter } from 'next/router';
import ExtraFeature from './extra-fiture';
import axios from 'axios';
import { alertError, alertSuccess, popUpAlert } from '../../alert';
import { PricingLoader } from '../../Loader';
import { motion } from 'framer-motion';
import { BASE_URL, DASHBOARD_URL } from '@/lib/env';

function PricingCard({ data, user, i }: any) {
	const { token } = USER();
	const router = useRouter();

	const hanldeSubscription = async (id: number, amount: string) => {
		const cb = async () => {
			try {
				const details = { subscription_id: id, payment_type: 'free' };
				if (token) {
					if (amount === '0') {
						const res = await axios.post(
							BASE_URL + '/api/buy-subscription',
							details,
							{
								headers: {
									Authorization: token,
									withCredentials: true,
								},
							}
						);
						const data = await res.data;
						if (data?.data === 'fail') {
							alertError('Error', data?.message);
						} else if (data?.data === 'success') {
							alertSuccess('Success', data?.message);
							// router.push('/');
							window.location.href = DASHBOARD_URL as string;
						}
						return;
					}
					// alertError('Wait!', 'Please Contact Admin');
					// return false;
					return router.push(`/checkout/${data?.id}`);
				}
				return router.push('/login');
			} catch (error) {
				alertError('Wait!', 'Please Contact Admin');
			}
		};
		popUpAlert('Membership', 'Are You Sure?', 'warning', cb);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{
				opacity: 1,
				transition: {
					duration: 0.5,
					delay: i * 0.1,
				},
			}}
			className={`${style.card} ${data.suggest === '1' && style.suggest} ${
				user?.usersubscription?.id === data.id && style.activated
			} `}
		>
			{data.suggest === '1' && (
				<span className={style.popular}>MOST POPULAR</span>
			)}
			{data.suggest === '1' && (
				<Image alt="shape" src={shape.Q} className={style.qShape} />
			)}

			<div>
				{/* {data.pricing */}
				{/* .filter((x) => x.time === time)
					.map((e) => (
					))} */}
				<div className={style.ppMonth}>
					<span className={style.pp}>৳ {data.subscription_amount}</span>
					<span className={style.monthTxt}>
						/{' '}
						<span className="!capitalize">
							{data.subscription_package_type.replace(/_/, ' ')}
						</span>
					</span>
				</div>
			</div>
			<h1 className={style.heading}>{data.card_heading}</h1>
			<div className={style.features}>
				<p className={style.features_head}>Features Included :</p>

				{/* <ExtraFeature data={data.affiliate_request} text="Affiliate Request:" />
				<ExtraFeature data={data.product_qty} text="Product Quantity:" />
				<ExtraFeature data={data.service_qty} text="Service Quantity:" />
				<ExtraFeature data={data.service_create} text="Service Create:" />
				<ExtraFeature data={data.product_approve} text="Product Approve:" />
				<ExtraFeature data={data.service_create} text="Service Create:" /> */}

				{data.card_facilities_title.map((e: any) => (
					<div key={e.id} className={style.items}>
						{e.key === 'yes' ? (
							<ICON.checkBox
								className={`${style.features_ico} ${
									e.key === 'yes' && style.active
								}`}
							/>
						) : (
							<ICON.x
								className={`${style.features_ico} ${
									e.key === 'yes' && style.active
								}`}
							/>
						)}
						<span
							className={`${style.features_item}  ${
								e.key === 'yes' && style.active
							}`}
						>
							{e.value}
						</span>
					</div>
				))}
			</div>

			<button
				onClick={() => hanldeSubscription(data?.id, data?.subscription_amount)}
				className={`${style.buyNow} ${data.suggest && 'mb-5'}`}
			>
				{data?.subscription_amount === '0' ? 'Get Free' : 'Buy Now'}
			</button>
		</motion.div>
	);
}

export default PricingCard;
