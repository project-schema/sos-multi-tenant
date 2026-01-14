'use client';

import {
	BestSellingProduct,
	CategoryProduct2,
	HomeBanner,
	HomeBanner3Image,
	HomeService,
	PopularCategory,
	RecommendedCategory,
} from '@/store/features/vendor/cms/home-page';
import { HomeAdvertiseBanner } from '@/store/features/vendor/cms/home-page/home-advertise-banner';
import { HomeOffer } from '@/store/features/vendor/cms/home-page/home-offer';
import { BasicInfo } from '@/store/features/vendor/cms/system';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') || 'home';

	switch (tab) {
		case 'home-slider':
			return <HomeBanner />;

		case 'home-banner-image':
			return <HomeBanner3Image />;

		case 'home-service':
			return <HomeService />;

		case 'popular-category':
			return <PopularCategory />;

		case 'best-selling-product':
			return <BestSellingProduct />;

		case 'best-selling-category':
			return <CategoryProduct2 />;

		case 'recommended-category':
			return <RecommendedCategory />;

		case 'home-offer':
			return <HomeOffer />;

		case 'advertise-banner':
			return <HomeAdvertiseBanner />;

		default:
			return <BasicInfo />;
	}
}
