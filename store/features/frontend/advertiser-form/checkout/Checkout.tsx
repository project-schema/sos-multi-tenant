'use client';
import { Loader2 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { timeDifference } from '@/lib';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useFrontendGetDollarRateQuery } from '../../frontend-api-slice';
import { useFrontendCreateAdvertiseMutation } from '../advertiser-form-api-slice';
import {
	level2Format,
	level2SubmitFormat,
	level3Format,
	prevStep,
	updatePaymentMethod,
} from '../advertiser-form-slice';
import amrPay from './amar-pay-icon.svg';
import myBalance from './my-balance.svg';
import style from './style.module.css';
import SummeryRow from './SummeryRow';

function Checkout() {
	const state = useAppSelector((state) => state.advertiseForm);
	const dispatch = useAppDispatch();
	const [store, { isLoading: storeLoading }] =
		useFrontendCreateAdvertiseMutation();
	const { data, isLoading } = useFrontendGetDollarRateQuery(undefined);
	const totalPP =
		parseInt(state.level2.budget_amount) *
			parseInt(String(data?.message?.amount ?? '0')) *
			(state.level2.budget === 'Daily Budget'
				? timeDifference(
						state.level2.start_date_view,
						state.level2.end_date_view
				  ) || 1
				: 1) || '--Error--';

	console.log(totalPP);
	const onSubmit = async () => {
		const formedDataLOthers = {
			campaign_objective: state.level1?.name,
			payment_method: state.paymethod,
			status: 'pending',
		};
		const formedDataL2 = level2SubmitFormat({
			...level2Format(state.level2),
			...level3Format(state.level3),
			...formedDataLOthers,
		});

		try {
			const response = await store(formedDataL2).unwrap();
			if (response?.message === 'Validation errors') {
			}
		} catch (error: any) {
			toast.error(error?.message || 'Something went wrong');
		}
	};
	return (
		<div
			id="top-advertise"
			className={`${style.checkoutFinal} ${style.active}`}
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
						pp={`$${state?.level2?.budget_amount || '00'}`}
						text={{ h: state?.level2?.budget || 'Budget', p: 'USD Currency' }}
					/>
					{isLoading ? (
						<Loader2 />
					) : (
						<SummeryRow
							pp={`৳ ${data?.message?.amount || '00'}`}
							text={{ h: 'Dollar Rate', p: 'BDT Conversion Rate' }}
						/>
					)}

					<SummeryRow
						pp={
							(timeDifference(
								state.level2.start_date_view,
								state.level2.end_date_view
							)?.toString() || '0') + ' Days'
						}
						text={{ h: 'Total Date' }}
					/>

					<SummeryRow pp={`৳ ${totalPP}`} text={{ h: `Total` }} />
				</div>
				{/* choose box  */}
				<div className={style.chooseWallerBox}>
					<h1 className={style.chooseWalletHeading}>Choose Your Wallet</h1>
					<div className={style.payOptions}>
						<div
							onClick={() => dispatch(updatePaymentMethod('aamarpay'))}
							className={`${style.checkField} ${
								state.paymethod === 'aamarpay' && style.active
							}`}
						>
							<span className={style.checkBorder}>
								<span
									className={`${style.dot} ${
										state.paymethod === 'aamarpay' && style.active
									}`}
								></span>
							</span>
							<Image alt="amr-pay" src={amrPay} />
						</div>

						<div
							onClick={() => dispatch(updatePaymentMethod('my-wallet'))}
							className={`${style.checkField} ${
								state.paymethod === 'my-wallet' && style.active
							}`}
						>
							<span className={style.checkBorder}>
								<span
									className={`${style.dot} ${
										state.paymethod === 'my-wallet' && style.active
									}`}
								></span>
							</span>
							<Image alt="amr-pay" src={myBalance} />
						</div>
					</div>
				</div>

				<div className="alert alert-error">
					<svg
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
					<span>Error! Err</span>
				</div>
				<div className="w-full">
					<div className="grid grid-cols-2 gap-4">
						<Button
							onClick={() => {
								dispatch(prevStep());

								if (window) {
									window.scrollTo(0, 0);
								}
							}}
							type="button"
							className="w-full"
							variant="outline"
						>
							Previous
						</Button>
						<Button
							onClick={onSubmit}
							type="button"
							disabled={storeLoading}
							className="w-full"
						>
							{storeLoading && (
								<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
							)}
							{false ? 'Wait...' : 'Pay Now'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
