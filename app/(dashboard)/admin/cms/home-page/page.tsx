'use client';

import {
	MainWebBanner,
	MainWebFeature1,
	MainWebFeature2,
	MainWebFeature3,
	MainWebFeature4,
	MainWebFeature5,
	MainWebFeature6,
	MainWebFeature7,
	MainWebFeature8,
} from '@/store/features/admin/cms/home-content';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') || 'banner';

	switch (tab) {
		case 'banner':
			return <MainWebBanner />;

		case 'feature1':
			return <MainWebFeature1 />;

		case 'feature2':
			return <MainWebFeature2 />;

		case 'feature3':
			return <MainWebFeature3 />;

		case 'feature4':
			return <MainWebFeature4 />;

		case 'feature5':
			return <MainWebFeature5 />;

		case 'feature6':
			return <MainWebFeature6 />;

		case 'feature7':
			return <MainWebFeature7 />;

		case 'feature8':
			return <MainWebFeature8 />;

		default:
			return <div>not content</div>;
	}
}
