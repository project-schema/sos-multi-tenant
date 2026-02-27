'use client';

import {
	BasicInfo,
	CMSFooter,
	CMSScripts,
	CMSSeo,
	CMSTheme,
	Cmssocial,
} from '@/store/features/vendor/cms/system';
import { CMSLoginPage } from '@/store/features/vendor/cms/system/login-page';
import { useSearchParams } from 'next/navigation';

export default function Page() {
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab') || 'basic-info';

	switch (tab) {
		case 'basic-info':
			return <BasicInfo />;

		case 'theme':
			return <CMSTheme />;

		case 'seo':
			return <CMSSeo />;

		case 'scripts':
			return <CMSScripts />;

		case 'social':
			return <Cmssocial />;

		case 'login-page':
			return <CMSLoginPage />;

		case 'footer':
			return <CMSFooter />;

		case 'basic-info':
		default:
			return <BasicInfo />;
	}
}
