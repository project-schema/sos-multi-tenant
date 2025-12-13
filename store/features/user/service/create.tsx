'use client';

import {
	AdvertiserFormProgressbar,
	AdvertiserFormTab1,
	AdvertiserFormTab2,
	AdvertiserFormTab3,
	AdvertiserFormTab4Checkout,
} from '@/store/features/frontend/advertiser-form';
import { advertiseStep } from '@/store/features/frontend/advertiser-form/advertiser-form-slice';

import { useSelector } from 'react-redux';

export function UserAdvertiseCreate({
	createAdvertise,
	isLoading,
}: {
	createAdvertise: (data: any) => void;
	isLoading: boolean;
}) {
	const step = useSelector(advertiseStep);

	return (
		<div className="layout db-advertise-create">
			<AdvertiserFormProgressbar currentStep={step} />
			{step === 1 && <AdvertiserFormTab1 />}
			{step === 2 && (
				<AdvertiserFormTab2
					createAdvertise={createAdvertise}
					isLoading={isLoading}
				/>
			)}
			{step === 3 && (
				<AdvertiserFormTab3
					createAdvertise={createAdvertise}
					isLoading={isLoading}
				/>
			)}
			{step === 4 && (
				<AdvertiserFormTab4Checkout
					createAdvertise={createAdvertise}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
}
