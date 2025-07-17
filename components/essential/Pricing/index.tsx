'use client';

import style from './pricing.module.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Radio from '@/components/frontend/Input/Radio';
import PricingCard from '@/components/frontend/Cards/PricingCard';
import { iSubscriptionsType } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';
function Pricing({
	user,
	subscriptions,
}: {
	user?: any;
	subscriptions: iSubscriptionsType;
}) {
	const { data: session } = useSession();
	const pathName = usePathname();
	console.log(pathName);
	const searchParams = useSearchParams().get('from');
	console.log(searchParams);
	const role = session?.user.role;
	const [toggle, setToggle] = useState(role === '3' ? 'affiliate' : 'vendor');
	const [time, setTime] = useState('monthly');

	useEffect(() => {
		/*
		   For User Switch To Vendor Or Affiliate
		   get from url and searchparams and set toggle 
		*/
		if (
			pathName === '/user/switch' &&
			(searchParams === 'vendor' || searchParams === 'affiliate')
		) {
			setToggle(searchParams === 'vendor' ? 'vendor' : 'affiliate');
		}
	}, [searchParams, pathName]);

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
					>
						<button
							disabled={role === '3'}
							onClick={() => setToggle('vendor')}
							className={`${style.btnTop} ${
								toggle === 'vendor' && style.active
							}`}
						>
							Merchant
						</button>
						<button
							disabled={role === '2'}
							onClick={() => setToggle('affiliate')}
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
