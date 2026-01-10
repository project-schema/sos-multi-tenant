'use client';

import {
	HomeBanner,
	HomeCategory,
	HomeService,
} from '@/store/features/vendor/cms/home-page';
import { BasicInfo } from '@/store/features/vendor/cms/system';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') || 'home';

	switch (tab) {
		case 'home-slider':
			return <HomeBanner />;

		case 'home-service':
			return <HomeService />;

		case 'home-category':
			return <HomeCategory />;

		default:
			return <BasicInfo />;
	}
}
