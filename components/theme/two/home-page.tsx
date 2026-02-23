import { Loader11, Loader9 } from '@/components/dashboard';
import { Footer02, Header02 } from '@/components/web';
import { Suspense } from 'react';
import ThemeTwoHomePageSuspense from './home-page-suspense';

export default async function ThemeTwoHomePage({
	searchParams,
}: {
	searchParams: {
		trend: string;
		search: string;
		feature: string;
		include: string;
	};
}) {
	const params = await searchParams;

	return (
		<>
			<Header02 />
			<Suspense
				fallback={
					<>
						<Loader11 />
						<Loader9 />
					</>
				}
			>
				<ThemeTwoHomePageSuspense searchParams={params} />
			</Suspense>
			<Footer02 />
		</>
	);
}
