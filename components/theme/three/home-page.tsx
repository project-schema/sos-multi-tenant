import { Loader11, Loader9 } from '@/components/dashboard';
import { Footer03, Header03 } from '@/components/web';
import { Suspense } from 'react';
import ThemeThreeHomePageSuspense from './home-page-suspense';

export default async function ThemeThreeHomePage({
	searchParams,
}: {
	searchParams: {
		trend: string;
		search: string;
		feature: string;
		include: string;
	};
}) {
	return (
		<>
			<Header03 />
			<Suspense
				fallback={
					<>
						<Loader11 />
						<Loader9 />
					</>
				}
			>
				<ThemeThreeHomePageSuspense searchParams={searchParams} />
			</Suspense>
			<Footer03 />
		</>
	);
}
