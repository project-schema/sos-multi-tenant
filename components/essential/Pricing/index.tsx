'use client';

import { Loader9 } from '@/components/dashboard';
import PricingCard from '@/components/frontend/Cards/PricingCard';
import Radio from '@/components/frontend/Input/Radio';
import { useVendorProfileInfoQuery } from '@/store/features/vendor/profile';
import { iSubscriptionsType } from '@/types';
import { motion } from 'motion/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from './pricing.module.css';
function Pricing({
	user,
	subscriptions,
}: {
	user?: any;
	subscriptions: iSubscriptionsType;
}) {
	const { data: session } = useSession();
	const tenant_type = session?.tenant_type;
	const pathName = usePathname();
	const { data: profile, isLoading: profileLoading } =
		useVendorProfileInfoQuery(undefined, {
			skip: tenant_type !== 'dropshipper' && tenant_type !== 'merchant',
		});
	const searchParams = useSearchParams().get('from');
	const router = useRouter();

	const isVendorOrAffiliate =
		searchParams === 'vendor' || searchParams === 'affiliate';
	// Since role is not available in the login response, default to vendor
	const [toggle, setToggle] = useState('vendor');
	const [time, setTime] = useState('monthly');

	useEffect(() => {
		/*
		    
		*/
		if (tenant_type === 'dropshipper') {
			setToggle('affiliate');
		}

		if (tenant_type === 'merchant') {
			setToggle('vendor');
		}
	}, [session]);

	useEffect(() => {
		/*
		    
		*/
		if (profile?.usersubscription) {
			const subscription = subscriptions.data.find(
				(e) => e.id === profile?.usersubscription?.subscription.id,
			);
			if (subscription) {
				setTime(subscription.subscription_package_type);
			}
		}
	}, [profile]);

	useEffect(() => {
		/*
		   For User Switch To Vendor Or Affiliate
		   get from url and searchparams and set toggle 
		*/
		if (pathName === '/user/switch' && isVendorOrAffiliate) {
			setToggle(searchParams === 'vendor' ? 'vendor' : 'affiliate');
		}
	}, [searchParams, pathName]);

	const handleToggle = (type: string) => {
		if (pathName === '/user/switch' && isVendorOrAffiliate) {
			router.push(`${pathName}?from=${type}`);
		}
		setToggle(type);
	};

	if (profileLoading)
		return (
			<>
				<Loader9 />
			</>
		);
	return (
		<section className={`${style.pricingMain} !mt-0`}>
			<div className="layout">
				<div className={style.wrap}>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.2,
							},
						}}
						className={style.topOfHead}
						hidden={tenant_type === 'dropshipper' || tenant_type === 'merchant'}
					>
						<button
							onClick={() => handleToggle('vendor')}
							className={`${style.btnTop} ${
								toggle === 'vendor' && style.active
							}`}
						>
							Merchant
						</button>
						<button
							onClick={() => handleToggle('affiliate')}
							className={`${style.btnTop} ${
								toggle === 'affiliate' && style.active
							}`}
						>
							Drop Shipper
						</button>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.2,
							},
						}}
						className={style.DateSelectBox}
					>
						<div className={style.date}>
							<Radio time={time} setTime={setTime} txt={'monthly'} />
							<Radio time={time} setTime={setTime} txt={'half_yearly'} />
							<Radio time={time} setTime={setTime} txt={'yearly'} />
						</div>
					</motion.div>
					<div className={style.ppCards}>
						{subscriptions?.data
							?.filter((e: any) => e.subscription_user_type === toggle)
							?.filter((e: any) => e.subscription_package_type === time)
							?.map((item: any, i: number) => (
								<PricingCard
									loading={false}
									key={item.id}
									data={item}
									time={time}
									user={user}
									i={i}
								/>
							))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Pricing;
