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

export default function Page() {
	const step = useSelector(advertiseStep);

	return (
		<div className="layout">
			<AdvertiserFormProgressbar currentStep={step} />
			{step === 1 && <AdvertiserFormTab1 />}
			{step === 2 && <AdvertiserFormTab2 />}
			{step === 3 && <AdvertiserFormTab3 />}
			{step === 4 && <AdvertiserFormTab4Checkout />}
		</div>
	);
}
