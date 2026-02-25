import { Loader11, Loader9 } from '@/components/dashboard';
import { Footer01, Header01 } from '@/components/web';
import { FrontendPageVisit } from '@/store/features/frontend';
import { Suspense } from 'react';
import ThemeOneHomePageSuspense from './home-page-suspense';

export default async function ThemeOneHomePage() {
	return (
		<>
			<FrontendPageVisit />
			<Header01 />
			<Suspense
				fallback={
					<>
						<Loader11 />
						<Loader9 />
					</>
				}
			>
				<ThemeOneHomePageSuspense />
			</Suspense>
			<Footer01 />
		</>
	);
}
