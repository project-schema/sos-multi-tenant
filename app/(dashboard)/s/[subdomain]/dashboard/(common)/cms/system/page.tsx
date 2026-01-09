'use client';

import {
	BasicInfo,
	CMSFooter,
	CMSScripts,
	CMSSeo,
	CMSTheme,
} from '@/store/features/vendor/cms/system';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') || 'home';

	switch (tab) {
		case 'basic-info':
			return <BasicInfo />;

		case 'theme':
			return <CMSTheme />;

		case 'seo':
			return <CMSSeo />;

		case 'scripts':
			return <CMSScripts />;

		case 'footer':
			return <CMSFooter />;

		default:
			return <BasicInfo />;
	}
}
