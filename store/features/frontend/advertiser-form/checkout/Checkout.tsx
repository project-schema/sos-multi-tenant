'use client';
import { Loader2 } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { timeDifference2 } from '@/lib';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoaderCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useFrontendGetDollarRateQuery } from '../../frontend-api-slice';
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

function Checkout({
	createAdvertise,
	isLoading,
}: {
	createAdvertise: (data: any) => any;
	isLoading: boolean;
}) {
	const { data: session } = useSession();
	const state = useAppSelector((state) => state.advertiseForm);
	console.log(state);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { data, isLoading: isLoadingDollarRate } =
		useFrontendGetDollarRateQuery(undefined);
	const totalPP =
		parseInt(state.level2.budget_amount) *
			parseInt(String(data?.message?.amount ?? '0')) *
			(state.level2.budget === 'Daily Budget'
				? timeDifference2(state.level2.start_date, state.level2.end_date) || 1
				: 1) || '------';

	const onSubmit = async () => {
		const formedDataLOthers = {
			campaign_objective: state.level1?.name,
			paymethod: state.paymethod,
			audience: 'no data',
			status: 'pending',
			tenant_type: session?.tenant_type === 'user' ? 'user' : 'tenant',
		};

		const formedDataL2 = level2SubmitFormat({
			...level2Format(state.level2),
			...level3Format(state.level3),
			...formedDataLOthers,
		});

		try {
			const response = await createAdvertise(formedDataL2).unwrap();
			if (response.status === 200) {
				if (response.message.result === 'true') {
					window.location.href = `${response.message.payment_url}`;
				} else {
					router.push(
						session?.tenant_type === 'user'
							? `/user/advertise`
							: `/dashboard/advertise`
					);
				}
				toast.success('Created successfully');
				// localStorage.removeItem('advertiseFormState');
				// dispatch(resetForm());
			} else {
				toast.error(response.message || 'Something went wrong');
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
					{isLoadingDollarRate ? (
						<Loader2 />
					) : (
						<SummeryRow
							pp={`৳ ${data?.message?.amount || '00'}`}
							text={{ h: 'Dollar Rate', p: 'BDT Conversion Rate' }}
						/>
					)}

					<SummeryRow
						pp={
							(timeDifference2(
								state.level2.start_date,
								state.level2.end_date
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
							disabled={isLoading}
							className="w-full"
						>
							{isLoading && (
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
