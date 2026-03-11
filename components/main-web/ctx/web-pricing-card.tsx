'use client';

import { cn } from '@/lib';
import { iAdminSubscription } from '@/store/features/admin/subscription';
import SubscriptionBuyModal from '@/store/features/frontend/pricing/subscription-buy-modal';
import { CircleX } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CheckDeep } from '../icons/check-deep';
import { CheckLight } from '../icons/check-light';
import { FreeIcon } from '../icons/free-icon';

export default function WebPricingCard({
	subscription,
}: {
	subscription: iAdminSubscription;
}) {
	const { data: session } = useSession();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isAuthPage = pathname === '/auth';
	const isPricingTab = tab === 'pricing';
	const isSubscription = session?.user?.usersubscription;

	const isFrontendPay = isAuthPage && isPricingTab && !isSubscription;
	const handleSwitch = () => {
		setIsModalOpen(true);
	};
	const isSuggest = subscription?.suggest?.toString() === '1';

	return (
		<div className="space-y-8">
			<div>
				{/* Icon + Title */}
				<div className="flex  items-center gap-4 mb-6">
					<FreeIcon />

					<div>
						<p className="text-gray-500 text-[16px] leading-[18px]">
							For individuals
						</p>

						<h3 className="text-[22px] font-bold text-secondary uppercase">
							{subscription.card_heading}
						</h3>
					</div>
				</div>

				{/* Price */}
				<div className="mb-6">
					<h2 className="text-[48px] font-bold text-gray-900">
						${subscription.subscription_amount}{' '}
						<span className="text-lg font-normal text-gray-500">
							/{subscription.subscription_package_type}
						</span>
					</h2>
				</div>

				{/* Features */}
				<div>
					<h4 className="font-semibold text-gray-900 mb-4">What’s included</h4>

					<ul className="space-y-3 text-gray-600">
						{subscription.card_facilities_title?.map((feature) => (
							<li key={feature.id} className="flex items-center gap-3">
								{feature.key === 'yes' && !isSuggest && <CheckLight />}
								{feature.key === 'yes' && isSuggest && <CheckDeep />}
								{feature.key === 'no' && <CircleX />}
								<span>{feature.value}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Button */}

			{!session?.user?.usersubscription && (
				<button
					onClick={handleSwitch}
					className={cn(
						`w-full mt-auto py-3 text-[18px] rounded-full  text-gray-800 font-medium hover:bg-gray-100 transition cursor-pointer     ${isSuggest ? 'btn--gradient text-white' : 'border border-gray-400'}`,
					)}
				>
					{subscription?.subscription_amount === '0' ? 'Get Free' : 'Buy Now'}
				</button>
			)}

			{/* if user have already subscription then show renew button */}
			{session?.user?.usersubscription &&
				subscription.subscription_amount !== '0' && (
					<button
						onClick={handleSwitch}
						className={cn(
							`w-full mt-auto py-3 text-[18px] rounded-full  text-gray-800 font-medium hover:bg-gray-100 transition cursor-pointer     ${isSuggest ? 'btn--gradient text-white' : 'border border-gray-400'}`,
						)}
					>
						Renew
					</button>
				)}

			<SubscriptionBuyModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				subscription={subscription}
			/>
		</div>
	);
}
