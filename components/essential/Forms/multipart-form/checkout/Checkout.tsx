import style from './style.module.css';
import { AppDispatch, AppState } from '../action/type';
import SummeryRow from './SummeryRow';
import Image from 'next/image';
import amrPay from '../../../../../../public/images/amar-pay-icon.svg';
import myBalance from '../../../../../../public/images/my-balance.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { USER } from '@/all-api/auth-headers';
import axios from 'axios';
import {
	convertDate,
	fetchData,
	matchingArrayElements,
	timeDifference,
} from '@/components/actions/action';
import { payment } from '../action/common-action';
import { useSession } from 'next-auth/react';
import { BASE_URL, DASHBOARD_PAGE } from '@/lib/env';
import { alertError, popUpAlert } from '@/components/ui/alert';
function Checkout({
	active,
	controlSlides,
	state,
	dispatch,
}: {
	active: boolean;
	controlSlides: Function;
	state: AppState;
	dispatch: AppDispatch;
}) {
	const router = useRouter();
	const { data } = useSession();
	const allData = {
		campaign_objective: state.level1.campaign_objective,
		campaign_name: state.level2.campaign_name,
		conversion_location: state.level2.conversion_location,
		performance_goal: state.level2.performance_goal,
		budget: state.level2.budget,
		budget_amount: state.level2.budget_amount,
		end_date: convertDate(state.level2.end_date_view as Date),
		start_date: convertDate(state.level2.start_date_view as Date),
		audience: 'no data',
		age: state.level2.age,
		ageto: state.level2.ageto,
		gender: state.level2.gender,
		detail_targeting: state.level2.detail_targeting,
		country: state.level2.country,
		city: state.level2.city,
		device: state.level2.device,
		platform: state.level2.platform,
		inventory: state.level2.inventory,
		format: state.level3.format,
		destination: state.level3.destination,
		tracking: state.level3.tracking,
		url_perimeter: state.level3.url_perimeter,
		number: state.level3.number,
		last_description: state.level3.last_description,
		paymethod: state.checkout.paymethod,
		advertise_audience_files: state.level2.advertise_audience_files?.map(
			(e) => e.url
		),
		location_files: state.level2.location_files?.map((e) => e.url),

		status: 'pending',
		placements: [
			{ feeds: state.level2.feeds || null },
			{ story_reels: state.level2.story_reels || null },
			{ adds_video_and_reels: state.level2.adds_video_and_reels || null },
			{ search_result: state.level2.search_result || null },
			{ messages: state.level2.messages || null },
			{ apps_and_sites: state.level2.apps_and_sites || null },
		].filter((e) => !Object.values(e).some((v) => v === null)),
		ad_creative:
			state?.level3.format === 'Existing Add'
				? [{ postid: state?.level3?.postid }]
				: state.cardsCreate.cards,
	};

	// const formData = {
	// 	...state.level1,
	// 	...state.level2,
	// 	...state.level3,
	// 	...state.checkout,
	// 	ad_creative: state.cardsCreate.cards,
	// 	placements: [
	// 		{ feeds: state.level2.feeds || null },
	// 		{ story_reels: state.level2.story_reels || null },
	// 		{ adds_video_and_reels: state.level2.adds_video_and_reels || null },
	// 		{ search_result: state.level2.search_result || null },
	// 		{ messages: state.level2.messages || null },
	// 		{ apps_and_sites: state.level2.apps_and_sites || null },
	// 	].filter((e) => !Object.values(e).some((v) => v === null)),
	// };
	const { token } = USER();
	const [loading, setLoading] = useState(false);
	const [dollar, setDollar] = useState('0');

	useEffect(() => {
		const getDollarRate = async () => {
			try {
				const res = await axios.get(BASE_URL + '/api/doller-rate');
				setDollar(res.data.message.amount);
			} catch (error) {}
		};

		getDollarRate();
	}, []);

	const totalPP =
		parseInt(state.level2.budget_amount) *
		parseInt(dollar) *
		(state.level2.budget === 'Daily Budget'
			? timeDifference(
					state.level2.start_date_view,
					state.level2.end_date_view
			  ) || 1
			: 1);

	// const calculateExtraCharge = () => {
	// 	const extraCharge = parseFloat(setting?.message?.extra_charge);
	// 	const totalPrice = totalPP;
	// 	return ((totalPrice * extraCharge) / 100 + totalPrice).toFixed(2);
	// };

	const submitCheckout = async () => {
		const cb = async () => {
			if (!data) {
				return router.push('/login');
			}
			dispatch({
				payload: {
					errorL4: false,
				},
				type: 'CLEAR_VALIDATION_ERROR',
			});
			setLoading(true);
			const url = BASE_URL + '/api/create-advertise';
			try {
				const response = await axios.post(url, allData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: token,
						withCredentials: true,
					},
				});
				const dataA = response.data;
				if (dataA?.message === 'Validation errors' && !dataA?.success) {
					let validationField = Object.keys(dataA.data);
					const matchingElements = matchingArrayElements(
						validationField,
						payment
					);
					if (matchingElements.length > 0) {
						dispatch({
							payload: {
								data: dataA?.data,
								error: {
									errorL4: true,
								},
							},
							type: 'VALIDATION_RES',
						});
						setLoading(false);
						return;
					}
					dispatch({
						payload: { errorL4: false },
						type: 'CLEAR_VALIDATION_RES',
					});

					// return controlSlides(true, { num: 4, value: true });
				}
				if (dataA.data === 'success') {
					return (window.location.href = dataA?.message?.payment_url
						? dataA?.message?.payment_url
						: DASHBOARD_PAGE(data?.user?.role, true, false, true) +
						  '/advertise');
				}
				if (!dataA.success) {
					alertError('Wait!', 'Something went wrong, please Create New Ad');
					router.push('/advertise');
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);

				if (axios.isAxiosError(error)) {
					if (error.response?.data.message === 'Unauthenticated.') {
						router.push('/login');
					}
					return error.message;
				} else {
					return 'An unexpected error occurred';
				}
			}
			setLoading(false);
		};
		popUpAlert('Payment', 'Are You Sure?', 'question', cb);
	};
	return (
		<div
			id="top-advertise"
			className={`${style.checkoutFinal} ${active && style.active}`}
		>
			<h1 className={style.heading}>Final Checkout</h1>
			{/* <p className={style.subHeading}>
				The mobile banking service of Mercantile Bank Ltd is branded as and it
				aims to connect
			</p> */}
			<div className={style.orderBox}>
				<h1 className={style.boxHeading}>Order Summary</h1>
				<div className={style.summeryBox}>
					<SummeryRow
						pp={`$${state.level2.budget_amount}`}
						text={{ h: state.level2.budget, p: 'USD Currency' }}
					/>
					<SummeryRow
						pp={`৳ ${dollar}`}
						text={{ h: 'Dollar Rate', p: 'BDT Conversion Rate' }}
					/>

					{state.level2.budget === 'Daily Budget' && (
						<SummeryRow
							pp={
								(timeDifference(
									state.level2.start_date_view,
									state.level2.end_date_view
								)?.toString() || '0') + ' Days'
							}
							text={{ h: 'Total Date' }}
						/>
					)}
					<SummeryRow pp={`৳ ${totalPP}`} text={{ h: `Total` }} />
					{/* {state.checkout.paymethod === 'aamarpay' && !loadingSetting && (
						<>
							<SummeryRow
								pp={`${setting?.message?.extra_charge}%`}
								text={{ h: 'Extra Charge', p: 'For Online Payment' }}
							/>
							<SummeryRow
								pp={`৳ ${calculateExtraCharge()}tk`}
								text={{ h: `You've to pay` }}
							/>
						</>
					)} */}
				</div>
				{/* choose box  */}
				<div className={style.chooseWallerBox}>
					<h1 className={style.chooseWalletHeading}>Choose Your Wallet</h1>
					<div className={style.payOptions}>
						<div
							onClick={() =>
								dispatch({
									payload: 'aamarpay',
									type: 'SELECT_PAYMENT_METHOD',
								})
							}
							className={`${style.checkField} ${
								state.checkout.paymethod === 'aamarpay' && style.active
							}`}
						>
							<span className={style.checkBorder}>
								<span
									className={`${style.dot} ${
										state.checkout.paymethod === 'aamarpay' && style.active
									}`}
								></span>
							</span>
							<Image alt="amr-pay" src={amrPay} />
						</div>

						<div
							onClick={() =>
								dispatch({
									payload: 'my-wallet',
									type: 'SELECT_PAYMENT_METHOD',
								})
							}
							className={`${style.checkField} ${
								state.checkout.paymethod === 'my-wallet' && style.active
							}`}
						>
							<span className={style.checkBorder}>
								<span
									className={`${style.dot} ${
										state.checkout.paymethod === 'my-wallet' && style.active
									}`}
								></span>
							</span>
							<Image alt="amr-pay" src={myBalance} />
						</div>
					</div>
				</div>

				{state.errorMessage.errorL4 && (
					<div className="alert alert-error">
						<svg
							onClick={() =>
								dispatch({
									type: 'CLEAR_VALIDATION_ERROR',
									payload: null,
								})
							}
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current shrink-0 h-6 w-6 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Error! {state.apiResponse.budget_amount}</span>
					</div>
				)}

				<button
					disabled={loading}
					onClick={submitCheckout}
					type="button"
					className={style.btn}
				>
					{loading ? 'Procced To Pay...' : 'Procced To Pay'}
				</button>
			</div>
		</div>
	);
}

export default Checkout;
