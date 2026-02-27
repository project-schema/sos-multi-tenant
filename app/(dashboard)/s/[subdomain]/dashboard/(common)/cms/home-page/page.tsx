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
import { HomeAdvertiseBanner14 } from '@/store/features/vendor/cms/home-page/home-advertise-banner-1-4';
import { HomeBanner1Image } from '@/store/features/vendor/cms/home-page/home-banner-1-image';
import { HomeOffer } from '@/store/features/vendor/cms/home-page/home-offer';
import { ProductSection4 } from '@/store/features/vendor/cms/home-page/products-section-4';
import { ProductSection5 } from '@/store/features/vendor/cms/home-page/products-section-5-';
import { ProductSection6 } from '@/store/features/vendor/cms/home-page/products-section-6';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') || 'home-offer';

	switch (tab) {
		case 'home-service':
			return <HomeService />;

		case 'home-offer':
			return <HomeOffer />;

		case 'home-slider':
			return <HomeBanner />;

		case 'home-banner-image':
			return <HomeBanner3Image />;

		case 'home-banner-1-image':
			return <HomeBanner1Image />;

		case 'popular-category':
			return <PopularCategory />;

		case 'best-selling-product':
			return <BestSellingProduct />;

		case 'best-selling-category':
			return <CategoryProduct2 />;

		case 'section-4':
			return <ProductSection4 />;

		case 'section-5':
			return <ProductSection5 />;

		case 'section-6':
			return <ProductSection6 />;

		case 'recommended-category':
			return <RecommendedCategory />;

		case 'advertise-banner':
			return <HomeAdvertiseBanner />;

		case 'advertise-banner-1-4':
			return <HomeAdvertiseBanner14 />;

		case 'home-offer':
		default:
			return <HomeOffer />;
	}
}
