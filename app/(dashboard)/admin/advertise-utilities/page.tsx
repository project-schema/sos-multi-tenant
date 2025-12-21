'use client';

import {
	AdFormatIndex,
	CampaignCategoryIndex,
	ConversionLocationIndex,
	PerformanceGoalIndex,
} from '@/store/features/admin/advertise-utilities';
import {
	AdvertiseCommonPaths,
	AdvertiseCommonUtilitiesIndex,
	iAdvertiseCommonPath,
} from '@/store/features/admin/advertise-utilities/common';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AdvertiseUtilitiesContent() {
	const tab = useSearchParams().get('tab');

	switch (tab) {
		case 'campaign_category':
			return <CampaignCategoryIndex />;
		case 'conversion_location':
			return <ConversionLocationIndex />;
		case 'performance_goal':
			return <PerformanceGoalIndex />;
		case 'ad_format':
			return <AdFormatIndex />;
		default:
			if (tab && AdvertiseCommonPaths.includes(tab as iAdvertiseCommonPath)) {
				return (
					<AdvertiseCommonUtilitiesIndex path={tab as iAdvertiseCommonPath} />
				);
			}
			return <CampaignCategoryIndex />;
	}
}

export default function Page() {
	return (
		<Suspense
			fallback={<div className="p-6 text-center">Loading utilities...</div>}
		>
			<AdvertiseUtilitiesContent />
		</Suspense>
	);
}
