'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MotionFadeIn from '@/store/features/auth/MotionFadeIn';
import { iSubscriptionsType } from '@/types';
import { useState } from 'react';
import WebPricingCard from './web-pricing-card';

export default function WebPricing({
	subscription,
}: {
	subscription: iSubscriptionsType;
}) {
	const [userType, setUserType] = useState<'vendor' | 'affiliate'>('vendor');
	const [packageType, setPackageType] = useState<
		'monthly' | 'half_yearly' | 'yearly'
	>('monthly');

	const filteredSubscriptions = subscription.data?.filter(
		(sub) =>
			sub.subscription_user_type === userType &&
			sub.subscription_package_type === packageType,
	);
	return (
		<>
			<div className="flex flex-col items-center gap-6 mb-[30px]">
				<MotionFadeIn>
					<div className="flex p-1 border border-primary rounded-full w-[290px]">
						<button
							onClick={() => setUserType('vendor')}
							className={`w-1/2 py-[10px] rounded-full font-medium ${
								userType === 'vendor'
									? 'bg-[#d1e4fc] text-primary'
									: 'text-gray-700'
							}`}
						>
							Merchant
						</button>

						<button
							onClick={() => setUserType('affiliate')}
							className={`w-1/2 py-[10px] rounded-full font-medium ${
								userType === 'affiliate'
									? 'bg-[#d1e4fc] text-primary'
									: 'text-gray-700'
							}`}
						>
							Dropshipper
						</button>
					</div>
				</MotionFadeIn>
				<MotionFadeIn>
					<RadioGroup
						value={packageType}
						onValueChange={(value) => setPackageType(value as any)}
						className="flex flex-wrap justify-center items-center md:gap-[40px] gap-[12px] font-medium"
					>
						<div className="flex items-center gap-2  ">
							<RadioGroupItem value="monthly" id="monthly" />
							<Label
								htmlFor="monthly"
								className={`cursor-pointer ${packageType === 'monthly' ? ' text-blue-600' : ''}`}
							>
								Monthly
							</Label>
						</div>

						<div className="flex items-center gap-2  ">
							<RadioGroupItem value="half_yearly" id="half_yearly" />
							<Label
								htmlFor="half_yearly"
								className={`cursor-pointer ${packageType === 'half_yearly' ? ' text-blue-600' : ''}`}
							>
								Half Yearly
							</Label>
						</div>

						<div className="flex items-center gap-2 ">
							<RadioGroupItem value="yearly" id="yearly" />
							<Label
								htmlFor="yearly"
								className={`cursor-pointer ${packageType === 'yearly' ? ' text-blue-600' : ''}`}
							>
								Annually
							</Label>
						</div>
					</RadioGroup>
				</MotionFadeIn>
			</div>
			<div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[30px]">
				{filteredSubscriptions?.map((sub, index) => (
					<MotionFadeIn
						key={sub.id}
						delay={index * 0.2}
						className={`price--card flex flex-col gap-8 w-[100%] h-full bg-gray-50 rounded-2xl shadow-md p-6 border border-gray-100  ${sub?.suggest?.toString() === '1' ? "bg-[url('https://i.ibb.co.com/YFxTN1wK/price-c-bg.png')] bg--img" : ''}`}
					>
						<WebPricingCard subscription={sub} />
					</MotionFadeIn>
				))}
			</div>
		</>
	);
}
