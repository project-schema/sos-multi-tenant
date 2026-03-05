import { Loader11, Loader9 } from '@/components/dashboard';
import Footer04 from '@/components/web/footer/04';
import Header04 from '@/components/web/header/04';
import { Suspense } from 'react';
import ThemeFourHomePageSuspense from './home-page-suspense';

export default async function ThemeFourHomePage({
	include,
}: {
	include: string;
}) {
	return (
		<>
			<Header04 />
			<Suspense
				fallback={
					<>
						<Loader11 />
						<Loader9 />
					</>
				}
			>
				<ThemeFourHomePageSuspense include={include} />
			</Suspense>
			<Footer04 />
		</>
	);
}
